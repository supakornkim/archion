<template>
  <section class="container-lg py-10" id="logos">
    <p class="muted mb-6 text-center text-sm">Trusted by teams and creators</p>
    <div class="grid grid-cols-2 items-center gap-6 opacity-80 sm:grid-cols-3 md:grid-cols-6">
      <div v-for="i in 6" :key="i" class="flex items-center justify-center">
        <svg class="h-6 w-24" viewBox="0 0 100 20" fill="currentColor">
          <rect width="100" height="20" rx="3" opacity=".12" />
        </svg>
      </div>
    </div>
  </section>
</template>
