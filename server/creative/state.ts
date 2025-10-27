export type Mood = 'ambitious' | 'urgent' | 'uncertain' | 'overwhelmed' | 'curious'
export type FlowStage = 'idea' | 'seed' | 'co_create' | 'commit' | 'track' | 'done' | 'paused'

export type Turn = {
  role: 'user' | 'archion'
  text: string
  ts: number
}

export type Checkpoint = {
  id: string
  title: string
  due: string // ISO
  done?: boolean
}

export type FlowSession = {
  id: string
  goal: string
  locale: 'th' | 'en'
  mood: Mood
  stage: FlowStage
  turns: Turn[]
  seedSteps: string[]
  checkpoints: Checkpoint[]
  createdAt: string
  updatedAt: string
}

export const db = () => useStorage<FlowSession>('archion:creative')

// helpers
export const uid = (p = 's') => p + Math.random().toString(36).slice(2, 10)
export const nowISO = () => new Date().toISOString()
