<script setup lang="ts">
  const features = [
    {
      title: 'Follow‑up engine',
      desc: 'Automatic check‑ins and smart reminders that nudge owners before things slip.',
      icon: '⏱️',
    },
    {
      title: 'Boards & timelines',
      desc: 'Plan in kanban or timeline — switch views instantly and stay aligned.',
      icon: '🗂️',
    },
    {
      title: 'Timeline safeguards',
      desc: 'Detects risks early, reschedules intelligently, and protects key milestones.',
      icon: '🛡️',
    },
    {
      title: 'Meaningful reports',
      desc: 'Outcome‑first insights: progress, blockers, and risk in one glance.',
      icon: '📊',
    },
  ]
</script>

<template>
  <section id="features" class="container-lg py-16">
    <div class="mb-10 flex items-end justify-between">
      <h2 class="text-2xl font-semibold">Features</h2>
      <a href="#docs" class="text-sm text-primary hover:underline">Explore docs →</a>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <article v-for="f in features" :key="f.title" class="card p-6">
        <div class="mb-4 text-2xl">{{ f.icon }}</div>
        <h3 class="mb-2 text-lg font-semibold">{{ f.title }}</h3>
        <p class="muted">{{ f.desc }}</p>
      </article>
    </div>
  </section>
</template>
