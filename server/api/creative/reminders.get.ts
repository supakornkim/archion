import { db, FlowSession } from '~/server/creative/state'

export default defineEventHandler(async () => {
  const store = db()
  // NOTE: useStorage(namespace) doesn't provide list by default; using internal driver
  const keys = (await (store as any).getKeys?.()) || []
  const due: Array<{
    sessionId: string
    checkpointId: string
    title: string
    due: string
    goal: string
  }> = []
  const now = Date.now()
  for (const k of keys) {
    const s = (await store.getItem(k)) as FlowSession
    if (!s) continue
    for (const cp of s.checkpoints) {
      if (!cp.done && +new Date(cp.due) <= now) {
        due.push({
          sessionId: s.id,
          checkpointId: cp.id,
          title: cp.title,
          due: cp.due,
          goal: s.goal,
        })
      }
    }
  }
  return { due }
})
