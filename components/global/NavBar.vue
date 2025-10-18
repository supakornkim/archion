<script setup lang="ts">
  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
    { label: 'Guide', href: '/brand' },
  ]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/10 bg-bg/80 backdrop-blur">
    <div class="container-lg flex h-16 items-center justify-between gap-6">
      <NuxtLink to="/" class="flex items-center gap-2">
        <LogoMark class="h-6 w-6" />
        <span class="text-sm font-semibold tracking-wide">Archion</span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-6 text-sm text-white/80">
        <a v-for="l in links" :key="l.href" :href="l.href" class="hover:text-white">{{
          l.label
        }}</a>
      </nav>

      <div class="flex items-center gap-2">
        <NuxtLink to="/login" class="btn btn-ghost">Sign in</NuxtLink>
        <NuxtLink to="/signup" class="btn btn-primary">Get started</NuxtLink>
      </div>
    </div>
  </header>
</template>
