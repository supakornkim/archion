<script setup lang="ts">
  import { ref } from 'vue'

  const goal = ref('')
  const timeframe = ref('')
  const loading = ref(false)
  const err = ref('')

  async function onSubmit() {
    err.value = ''
    if (!goal.value.trim()) {
      err.value = 'Please enter your goal first.'
      return
    }
    loading.value = true
    try {
      const q = new URLSearchParams({
        goal: goal.value,
        timeframe: timeframe.value || '',
        locale: 'en',
      })
      navigateTo(`/plan?${q.toString()}`)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <section class="relative py-12 md:py-16">
    <div class="max-w-5xl mx-auto px-4">
      <div class="text-center mb-6">
        <h2 class="text-2xl md:text-3xl font-bold">
          Tell <span class="text-blue-500">Archion</span> your goal
        </h2>
        <p class="text-gray-400 mt-2">
          Type what you want to achieve and within how long — Archion will generate your action
          plan.
        </p>
      </div>

      <div class="bg-white/10 border border-white/20 rounded-2xl p-4 md:p-5 backdrop-blur">
        <div class="flex flex-col gap-3 md:flex-row">
          <input
            v-model="goal"
            class="flex-1 bg-transparent border-b border-white/30 pb-2 text-white placeholder-gray-400 focus:outline-none"
            placeholder="e.g., Start an online rice shop"
          />
          <input
            v-model="timeframe"
            class="md:w-56 bg-transparent border-b border-white/30 pb-2 text-white placeholder-gray-400 focus:outline-none"
            placeholder="e.g., 6 months / 4 weeks"
          />
          <button
            :disabled="loading"
            @click="onSubmit"
            class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg px-5 py-2"
          >
            {{ loading ? 'Generating…' : 'Generate Plan' }}
          </button>
        </div>

        <p v-if="err" class="text-red-300 text-sm mt-2">{{ err }}</p>

        <div class="mt-4 text-left text-gray-400 text-sm">
          <p class="mb-1">Examples:</p>
          <div class="flex flex-wrap gap-2">
            <button
              class="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20"
              @click="((goal = 'Launch an online course'), (timeframe = '2 months'))"
            >
              Online course (2 months)
            </button>
            <button
              class="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20"
              @click="((goal = 'Lose 5kg'), (timeframe = '1 month'))"
            >
              Lose 5kg (1 month)
            </button>
            <button
              class="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20"
              @click="((goal = 'Start an online rice shop'), (timeframe = '6 months'))"
            >
              Rice shop (6 months)
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
