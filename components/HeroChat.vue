<script setup lang="ts">
import { ref } from 'vue'
const goal = ref('')
const timeframe = ref('')
const loading = ref(false)
const err = ref('')

async function onSubmit() {
  err.value = ''
  if (!goal.value.trim()) { err.value = 'พิมพ์เป้าหมายก่อนนะครับ'; return }
  loading.value = true
  try {
    const q = new URLSearchParams({
      goal: goal.value,
      timeframe: timeframe.value || '',
      locale: 'th'
    })
    navigateTo(`/plan?${q.toString()}`)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
    <h1 class="text-4xl md:text-6xl font-bold mb-3">
      Archion <span class="text-blue-500">Plans</span> your goal
    </h1>
    <p class="text-gray-400 mb-8 max-w-2xl">พิมพ์ว่าอยากทำอะไร และภายในกี่วัน/เดือน เดี๋ยว Archion แตกแผนให้</p>

    <div class="w-full max-w-2xl bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur">
      <div class="flex flex-col gap-3 sm:flex-row">
        <input
          v-model="goal"
          class="flex-1 bg-transparent border-b border-white/30 pb-2 text-white placeholder-gray-400 focus:outline-none"
          placeholder="เช่น: เปิดร้านขายข้าวออนไลน์"
        />
        <input
          v-model="timeframe"
          class="sm:w-48 bg-transparent border-b border-white/30 pb-2 text-white placeholder-gray-400 focus:outline-none"
          placeholder="เช่น: 2 เดือน / 1 สัปดาห์"
        />
        <button
          :disabled="loading"
          @click="onSubmit"
          class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg px-5 py-2"
        >
          {{ loading ? 'กำลังไปหน้าแผน…' : 'สร้างแผน' }}
        </button>
      </div>
      <p v-if="err" class="text-red-300 text-sm mt-2">{{ err }}</p>
      <div class="mt-4 text-left text-gray-400 text-sm">
        <p class="mb-1">ตัวอย่าง:</p>
        <div class="flex flex-wrap gap-2">
          <button class="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20" @click="goal='อยากเปิดเว็บขายคอร์ส'; timeframe='2 เดือน'">คอร์ส 2 เดือน</button>
          <button class="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20" @click="goal='ลดน้ำหนัก 5 กก.'; timeframe='1 เดือน'">ลด 5 กก. 1 เดือน</button>
          <button class="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20" @click="goal='เปิดร้านขายข้าวออนไลน์'; timeframe='6 เดือน'">ร้านข้าว 6 เดือน</button>
        </div>
      </div>
    </div>
  </section>
</template>
