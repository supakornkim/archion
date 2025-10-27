import { z } from 'zod'

const Body = z.object({
  goal: z.string().min(3),
  locale: z.enum(['th', 'en']).default('th'),
})

export default defineEventHandler(async (event) => {
  console.log('[creative/start] hit', getMethod(event))
  const raw = await readBody(event)
  console.log('[creative/start] body =', raw)

  const { goal, locale } = Body.parse(raw)
  return {
    session: {
      id: 'flow_mock_' + Math.random().toString(36).slice(2, 8),
      goal,
      locale,
      mood: 'curious',
      stage: 'seed',
      seedSteps: [
        'นิยามความสำเร็จของคุณให้ชัด 1 ประโยค',
        'เลือกสิ่งเล็ก ๆ ที่ทำได้ภายใน 48 ชั่วโมง',
        'เล่าไอเดียให้ 3 คนฟังเพื่อรับฟีดแบ็ก',
      ],
      checkpoints: [],
      turns: [
        { role: 'user', text: goal, ts: Date.now() },
        {
          role: 'archion',
          text: 'ฟังดูน่าสนใจครับ! อยากให้เริ่มเป็น seed plan เลย หรืออยาก brainstorm ก่อนดี?',
          ts: Date.now(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }
})
