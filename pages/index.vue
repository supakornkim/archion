<script setup lang="ts">
  import Hero from '~/components/sections/Hero.vue'
  import Logos from '~/components/sections/Logos.vue'
  import Features from '~/components/sections/Features.vue'
  import KPIStripe from '~/components/sections/KPIStripe.vue'
  import Testimonials from '~/components/sections/Testimonials.vue'
  import CTA from '~/components/sections/CTA.vue'
  import HeroChat from '~/components/sections/HeroChat.vue'
</script>

<template>
  <div>
    <Hero />
    <HeroChat />
    <Logos />
    <Features />
    <KPIStripe />
    <Testimonials />
    <CTA />
  </div>
</template>
