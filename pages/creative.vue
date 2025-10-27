<script setup lang="ts">
  import { ref } from 'vue'

  type Turn = { role: 'user' | 'archion'; text: string; ts: number }
  type Session = {
    id: string
    goal: string
    locale: 'th' | 'en'
    mood: string
    stage: string
    turns: Turn[]
    seedSteps: string[]
    checkpoints: { id: string; title: string; due: string; done?: boolean }[]
  }

  const input = ref('')
  const goal = ref('')
  const session = ref<Session | null>(null)
  const loading = ref(false)
  const nextSteps = ref<string[]>([])
  const commitTitle = ref('')

  async function startFlow() {
    if (!goal.value.trim()) return
    loading.value = true
    try {
      const res = await $fetch<{ session: Session }>('/api/creative/start', {
        method: 'POST',
        body: { goal: goal.value, locale: 'th' },
      })
      session.value = res.session
    } finally {
      loading.value = false
    }
  }

  async function sendTurn() {
    if (!session.value || !input.value.trim()) return
    const msg = input.value
    input.value = ''
    loading.value = true
    try {
      const res = await $fetch<{ session: Session; nextSteps: string[] }>(
        '/api/creative/continue',
        {
          method: 'POST',
          body: { sessionId: session.value.id, userText: msg },
        }
      )
      session.value = res.session
      nextSteps.value = res.nextSteps || []
    } finally {
      loading.value = false
    }
  }

  async function commitCheckpoint() {
    if (!session.value || !commitTitle.value.trim()) return
    loading.value = true
    try {
      const res = await $fetch<{ session: Session }>('/api/creative/commit', {
        method: 'POST',
        body: { sessionId: session.value.id, title: commitTitle.value, dueInDays: 3 },
      })
      session.value = res.session
      commitTitle.value = ''
    } finally {
      loading.value = false
    }
  }

  async function finalizePlan() {
    if (!session.value) return
    loading.value = true
    try {
      const plan = await $fetch('/api/creative/finalize', {
        method: 'POST',
        body: { sessionId: session.value.id },
      })
      // reuse existing /plan renderer by navigating with serialized params, or show inline
      const blob = encodeURIComponent(JSON.stringify(plan))
      navigateTo(`/plan?from=creative&data=${blob}`)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <section class="max-w-4xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-4">Creative Flow</h1>

    <div v-if="!session" class="space-y-4">
      <input
        v-model="goal"
        class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3"
        placeholder="บอกเป้าหมาย เช่น: เปิดร้านข้าวกล่อง / Start an online rice shop"
      />
      <button
        @click="startFlow"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2"
      >
        {{ loading ? 'Starting…' : 'Start' }}
      </button>
    </div>

    <div v-else class="space-y-6">
      <div class="bg-white/5 border border-white/10 rounded-xl p-4">
        <p class="text-sm text-gray-400">Goal</p>
        <p class="font-semibold">{{ session.goal }}</p>
        <p class="text-xs text-gray-500 mt-1">
          mood: {{ session.mood }} · stage: {{ session.stage }}
        </p>
      </div>

      <div class="space-y-2">
        <div
          v-for="t in session.turns"
          :key="t.ts"
          :class="t.role === 'user' ? 'text-right' : 'text-left'"
        >
          <div
            :class="[
              'inline-block px-3 py-2 rounded-lg max-w-[85%]',
              t.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white/10 border border-white/10',
            ]"
          >
            {{ t.text }}
          </div>
        </div>
      </div>

      <div v-if="nextSteps.length" class="bg-white/5 border border-white/10 rounded-xl p-4">
        <p class="text-sm text-gray-400 mb-2">Suggested next steps</p>
        <ul class="list-disc list-inside text-gray-200">
          <li v-for="s in nextSteps" :key="s">{{ s }}</li>
        </ul>
      </div>

      <div class="flex gap-2">
        <input
          v-model="input"
          class="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3"
          placeholder="ตอบกลับเพื่อร่วมสร้างแผน…"
          @keyup.enter="sendTurn"
        />
        <button
          @click="sendTurn"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {{ loading ? '...' : 'Send' }}
        </button>
      </div>

      <div class="bg-white/5 border border-white/10 rounded-xl p-4">
        <p class="text-sm text-gray-400 mb-2">Commit a checkpoint (turn talk → action)</p>
        <div class="flex gap-2">
          <input
            v-model="commitTitle"
            class="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3"
            placeholder="เช่น: โทรหา supplier 2 เจ้า ภายใน 3 วัน"
          />
          <button @click="commitCheckpoint" class="border border-white/20 px-4 py-2 rounded-lg">
            Commit
          </button>
          <button
            @click="finalizePlan"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Finalize Plan
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
