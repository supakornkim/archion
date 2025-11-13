// server/api/onboarding/create-first-workspace.ts
import { defineEventHandler, readBody } from 'h3';
import { serverSupabaseUser } from '#supabase/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- Config Keys ---
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
const geminiKey = process.env.GEMINI_API_KEY || '';

// --- (Build Prompt Function - ย้ายมาจาก create-plan) ---
const buildPrompt = (objective: string, metric: string, timeframe: string, persona: string, targetMarket: string) => { 
  const today = new Date().toISOString().split('T')[0];
  return `
You are "Archion", a proactive AI Boss.
Your task is to take a user's goal and break it down into an initial action plan
that is SPECIFIC to their target market.

// --- User Input ---
1.  **Persona**: "${persona}"
2.  **Objective**: "${objective}"
3.  **Metric**: "${metric}"
4.  **Timeframe**: "${timeframe}"
5.  **Target Market Country**: "${targetMarket}"
6.  **Today's Date**: ${today}

// --- Instructions ---
- Tasks must be localized for the 'Target Market Country'.
- All tasks MUST have a "temp_id", "task", "reason", "deadline" (YYYY-MM-DD), and "status".

// --- JSON Output Format (Strict) ---
{
  "tasks": [
    { "temp_id": "t1", "task": "...", "reason": "...", "deadline": "YYYY-MM-DD", "status": "today" },
    { "temp_id": "t2", "task": "...", "reason": "...", "deadline": "YYYY-MM-DD", "status": "inbox" }
  ]
}
JSON Response:
`;
};

// --- API Endpoint Handler ---
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) throw new Error('Not authenticated');

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  const genAI = new GoogleGenerativeAI(geminiKey);
  
  // (รับ Input ทั้งหมดจากฟอร์มเดียว)
  const { 
    teamName, timezone,
    objective, metric, timeframe, persona, target_market_country
  } = await readBody(event);

  if (!teamName || !timezone || !objective || !metric) {
    throw new Error('Missing required onboarding fields.');
  }

  try {
    // --- (A) ตรวจสอบเครดิต ---
    // (ดึง "ป้ายราคา" ของการสร้างแผน)
    const { data: productCost, error: costError } = await supabaseAdmin
      .from('products')
      .select('base_cost, cost_per_task')
      .eq('action_id', 'CREATE_PLAN')
      .single();
    if (costError) throw new Error('Could not determine cost for creating plan.');
    
    // (เรายังไม่รู้จำนวน Task, ดังนั้นเราจะใช้แค่ Base Cost ก่อน)
    const estimatedCost = productCost.base_cost; 
    
    // (User เพิ่งสมัคร, เขายังไม่มีทีม... เราต้องสร้างทีมก่อน)
    
    // --- (B) สร้าง Team, Member, Settings ---
    const { data: newTeam, error: newTeamError } = await supabaseAdmin
      .from('teams')
      .insert({ team_name: teamName, owner_user_id: user.id, subscription_plan: 'free', credit_balance: 50 }) // (ให้ 50 เครดิตฟรี)
      .select().single();
    if (newTeamError) throw new Error('Failed to create team: ' + newTeamError.message);

    await supabaseAdmin.from('team_members').insert({ team_id: newTeam.id, user_id: user.id, role: 'admin' });
    await supabaseAdmin.from('user_notification_settings').upsert({ user_id: user.id, timezone: timezone }, { onConflict: 'user_id' });

    // --- (C) เช็คเครดิตอีกครั้ง (ตอนนี้ทีมมีเครดิต 50) ---
    if (newTeam.credit_balance < estimatedCost) {
      throw new Error('Not enough credits to generate first plan.');
    }
    
    // --- (D) เรียก Gemini (สร้างแผน) ---
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = buildPrompt(objective, metric, timeframe, persona, target_market_country);
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI did not return valid JSON.");
    
    const aiPlan = JSON.parse(jsonMatch[0]);
    const generatedTaskCount = aiPlan.tasks?.length || 0;

    // --- (E) คำนวณต้นทุนจริง (Dynamic Cost) ---
    const finalCost = productCost.base_cost + (generatedTaskCount * productCost.cost_per_task);

    // --- (F) สร้าง 'plans' ---
    const { data: newPlan, error: planError } = await supabaseAdmin
      .from('plans')
      .insert({ 
        team_id: newTeam.id,
        persona: persona,
        timeframe: timeframe,
        goal_objective: objective,
        goal_metric: metric,
        target_market_country: target_market_country,
        is_active: true // (แผนแรก Active เลย)
      })
      .select().single();
    if (planError) throw new Error(`Failed to create plan: ${planError.message}`);

    // --- (G) สร้าง 'tasks' ---
    const tasksToInsert = aiPlan.tasks.map((task: any) => ({
      plan_id: newPlan.id,
      team_id: newTeam.id,
      assignee_user_id: user.id, // (Default ให้คนสร้าง)
      description: task.task,
      reason: task.reason,
      deadline: task.deadline,
      status: task.status,
      source: 'ARCHION_AI' as const
    }));
    await supabaseAdmin.from('tasks').insert(tasksToInsert);

    // --- (H) หักเครดิต (Deduct Credits) ---
    const newBalance = newTeam.credit_balance - finalCost;
    await supabaseAdmin.from('teams').update({ credit_balance: newBalance }).eq('id', newTeam.id);
    await supabaseAdmin.from('credit_ledger').insert({
      team_id: newTeam.id,
      amount: -finalCost,
      description: `Create Plan: ${objective} (${generatedTaskCount} tasks)`
    });

    // (สำเร็จ!) ส่ง "ทีม" กลับไป (เพราะ Dashboard ต้องใช้ Team)
    return newTeam;

  } catch (error: any) {
    console.error('Error in onboarding:', error.message);
    return { statusCode: 500, message: error.message };
  }
});
