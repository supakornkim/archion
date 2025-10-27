import { z } from 'zod'

const Body = z.object({
  sessionId: z.string(),
  userText: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  console.log('[creative/continue] hit', getMethod(event))
  const raw = await readBody(event)
  console.log('[creative/continue] body =', raw)

  const { sessionId, userText } = Body.parse(raw)
  // ... (rest of logic)
  return { ok: true, sessionId, echo: userText }
})
