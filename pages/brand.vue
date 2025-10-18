<script setup lang="ts">
  const pillars = [
    {
      title: 'Clarity',
      desc: 'See what matters at a glance — clean UI, calm copy, confident decisions.',
    },
    { title: 'Momentum', desc: 'Keep work in motion — nudge, align, and reduce friction.' },
    { title: 'Intelligence', desc: 'AI that plans, prioritizes, and adapts — quietly powerful.' },
    { title: 'Meaning', desc: 'Tie daily actions to goals that matter — for teams and people.' },
  ]

  const taglines = [
    'AI that turns goals into momentum.',
    'Clarity meets automation — in one beautiful flow.',
    'Where focus becomes forward motion.',
    'Plan less. Achieve more.',
    'Your work, in perfect rhythm.',
  ]

  const microCtas = [
    { use: 'Primary CTA', text: 'Start for free' },
    { use: 'Secondary CTA', text: 'See how it works' },
    { use: 'Alt CTA', text: "Let's get started" },
  ]

  const microStates = [
    { use: 'Loading / AI', text: 'Finding your next best move…' },
    { use: 'Notification', text: 'Your timeline just got smoother.' },
    { use: 'Empty', text: 'No chaos here yet — create your first board.' },
    { use: 'Success', text: 'Momentum gained 🎯' },
  ]

  const emailSubjects = [
    'Your week, perfectly aligned.',
    'Archion just saved you 3 steps.',
    'Momentum never sleeps.',
    'AI insights for your next move.',
  ]
</script>

<template>
  <main class="container-lg py-16">
    <div class="mb-10">
      <div class="badge mb-4">Brand Guide</div>
      <h1 class="text-3xl font-semibold">Archion – Voice & Messaging</h1>
      <p class="muted mt-3 max-w-2xl">
        Intelligent flow for meaningful work. Use this guide for web, product UI, and marketing.
      </p>
    </div>

    <!-- Pillars -->
    <section class="mb-12">
      <h2 class="mb-4 text-xl font-semibold">Messaging Pillars</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article v-for="p in pillars" :key="p.title" class="card p-5">
          <h3 class="mb-1 text-base font-semibold">{{ p.title }}</h3>
          <p class="muted text-sm">{{ p.desc }}</p>
        </article>
      </div>
    </section>

    <!-- Taglines -->
    <section class="mb-12">
      <h2 class="mb-4 text-xl font-semibold">Taglines</h2>
      <div class="card p-5">
        <ul class="list-disc space-y-2 pl-5">
          <li v-for="t in taglines" :key="t" class="text-white/90">{{ t }}</li>
        </ul>
      </div>
    </section>

    <!-- Microcopy -->
    <section class="mb-12 grid gap-6 md:grid-cols-2">
      <div>
        <h2 class="mb-3 text-xl font-semibold">CTA microcopy</h2>
        <div class="card p-5">
          <ul class="space-y-2">
            <li
              v-for="c in microCtas"
              :key="c.text"
              class="flex items-start justify-between gap-4 text-sm"
            >
              <span class="muted">{{ c.use }}</span>
              <span class="text-white/90">{{ c.text }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2 class="mb-3 text-xl font-semibold">UI states microcopy</h2>
        <div class="card p-5">
          <ul class="space-y-2">
            <li
              v-for="s in microStates"
              :key="s.text"
              class="flex items-start justify-between gap-4 text-sm"
            >
              <span class="muted">{{ s.use }}</span>
              <span class="text-white/90">{{ s.text }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Emails -->
    <section class="mb-12">
      <h2 class="mb-3 text-xl font-semibold">Email – subject lines</h2>
      <div class="card p-5">
        <div class="grid gap-2 md:grid-cols-2">
          <div
            v-for="e in emailSubjects"
            :key="e"
            class="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/90"
          >
            {{ e }}
          </div>
        </div>
      </div>
    </section>

    <!-- Download / Use -->
    <section class="mb-4">
      <div class="card flex flex-col items-center gap-3 p-6 text-center">
        <h3 class="text-lg font-semibold">Use this voice across web, product, and socials</h3>
        <p class="muted">
          Keep it calm, clear, and confident. Focus on clarity, momentum, intelligence, and meaning.
        </p>
        <div class="flex gap-3">
          <NuxtLink to="/" class="btn btn-ghost">Back to Home</NuxtLink>
          <a href="#" class="btn btn-primary">Copy to style guide</a>
        </div>
      </div>
    </section>
  </main>
</template>
