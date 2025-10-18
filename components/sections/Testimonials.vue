<script setup lang="ts">
  const quotes = [
    {
      name: 'Maya N.',
      role: 'COO, Fintech',
      quote:
        'Archion turns nudges into real progress. Our standups got shorter, outcomes got clearer.',
    },
    {
      name: 'Kenji S.',
      role: 'Head of Product',
      quote: 'The clean UI + proactive reminders shaved days off our release cycles.',
    },
  ]
</script>

<template>
  <section class="container-lg py-16">
    <h2 class="mb-8 text-2xl font-semibold">Loved by modern teams</h2>
    <div class="grid gap-6 md:grid-cols-2">
      <figure v-for="q in quotes" :key="q.name" class="card p-6">
        <blockquote class="mb-4 text-white/90">“{{ q.quote }}”</blockquote>
        <figcaption class="text-sm text-white/60">— {{ q.name }}, {{ q.role }}</figcaption>
      </figure>
    </div>
  </section>
</template>
