<script setup lang="ts">
  import NavBar from '~/components/global/NavBar.vue'
  import SiteFooter from '~/components/global/SiteFooter.vue'
  useHead({ htmlAttrs: { lang: 'en' } })
</script>

<template>
  <div class="min-h-screen bg-bg text-white selection:bg-primary selection:text-white">
    <NavBar />
    <NuxtPage />
    <SiteFooter />
  </div>
</template>
