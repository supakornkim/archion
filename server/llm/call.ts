// Replace later with real provider. This mock keeps the UX flowing now.
type AskArgs = { system: string; user: string }
export async function callLLMJson({ system, user }: AskArgs): Promise<any> {
  const U = user.toLowerCase()

  // very small mood detector
  const mood =
    U.includes('urgent') || U.includes('ด่วน')
      ? 'urgent'
      : U.includes('confus') || U.includes('งง')
        ? 'uncertain'
        : U.includes('ใหญ่') || U.includes('ambitious')
          ? 'ambitious'
          : 'curious'

  // START prompt
  if (system.includes('Creative Start')) {
    const seed = [
      'Define what success looks like for you',
      'Identify one small experiment you can run this week',
      'Tell 3 people about your idea to get feedback',
    ]
    return {
      mood,
      summary:
        U.length > 0 ? 'Understand user goal & kick off a light first step.' : 'Goal captured.',
      seedSteps: seed,
      reply:
        'ฟังดูน่าสนใจครับ! อยากให้ผมเริ่มแตก “แนวทางเริ่มต้น (seed plan)” ให้เลย หรืออยาก brainstorm จุดขาย/อุปสรรคก่อนดี?',
    }
  }

  // CONTINUE prompt
  if (system.includes('Creative Continue')) {
    return {
      nextSteps: [
        'Write a one-sentence promise of value',
        'Draft a simple offer or challenge for week 1',
        'Decide a check-in day & time',
      ],
      reply:
        'โอเคครับ ผมเพิ่มขั้นต่อไปให้แล้ว ลองเลือกหนึ่งอย่างที่อยากทำให้สำเร็จภายใน 48 ชั่วโมง แล้วบอกผมได้เลย จะได้ตั้ง checkpoint ให้ครับ',
    }
  }

  // FINALIZE prompt
  if (system.includes('Creative Finalize')) {
    const now = new Date()
    const d = (n: number) => {
      const t = new Date(now)
      t.setDate(t.getDate() + n)
      return t.toISOString()
    }
    return {
      goal: 'Creative plan (consolidated)',
      milestones: [
        { title: 'Seed & Validate', dueDate: d(7) },
        { title: 'Build the First Version', dueDate: d(21) },
        { title: 'Launch Small & Iterate', dueDate: d(35) },
      ],
      tasks: [
        { title: 'Define success & constraints', priority: 'high' },
        { title: 'Run a tiny test with 3–5 people', priority: 'med' },
        { title: 'Pick a weekly check-in time', priority: 'low' },
      ],
      kpi: [
        'Do 1 real action within 48 hours',
        'Get 3 real feedback notes',
        'Commit to weekly review',
      ],
    }
  }

  return {}
}
