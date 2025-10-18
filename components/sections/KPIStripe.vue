<script setup lang="ts">
  const kpis = [
    { label: 'Teams onboarded', value: '2,400+' },
    { label: 'Tasks automated', value: '1.2M' },
    { label: 'Avg. cycle time', value: '−22%' },
  ]
</script>

<template>
  <section class="container-lg">
    <div class="card grid grid-cols-1 gap-6 rounded-2xl p-6 sm:grid-cols-3">
      <div v-for="k in kpis" :key="k.label" class="text-center sm:text-left">
        <div class="text-2xl font-semibold">{{ k.value }}</div>
        <div class="muted text-sm">{{ k.label }}</div>
      </div>
    </div>
  </section>
</template>
