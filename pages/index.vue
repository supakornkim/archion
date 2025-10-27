<script setup lang="ts">
  import Hero from '~/components/sections/Hero.vue'
  import Logos from '~/components/sections/Logos.vue'
  import Features from '~/components/sections/Features.vue'
  import KPIStripe from '~/components/sections/KPIStripe.vue'
  import Testimonials from '~/components/sections/Testimonials.vue'
  import CTA from '~/components/sections/CTA.vue'

  // ใช้ HeroChat เดิมของ Ton
  import HeroChat from '~/components/HeroChat.vue'
</script>

<template>
  <div>
    <Hero />

    <!-- ===== Creative Flow block (centered) ===== -->
    <section
      class="relative mx-auto w-full max-w-6xl px-4 md:px-6"
      aria-label="Creative Flow Section"
    >
      <!-- bg card -->
      <div
        class="mt-8 md:mt-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)] overflow-hidden"
      >
        <!-- header copy -->
        <div class="px-6 sm:px-10 pt-8 text-center">
          <h2 class="text-2xl md:text-3xl font-semibold">
            Turn your idea into action with <span class="text-purple-400">Creative Flow</span>
          </h2>
          <p class="mt-2 text-sm md:text-base text-gray-300">
            Tell Archion your goal, co-create the next steps, then commit a checkpoint.
          </p>
        </div>

        <!-- chat input (kept centered by container) -->
        <div class="px-4 sm:px-8 md:px-12 pt-4 md:pt-6">
          <HeroChat />
        </div>

        <!-- CTA row -->
        <div class="px-6 sm:px-10 pb-8 flex items-center justify-center">
          <NuxtLink
            to="/creative"
            class="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-3 transition-transform hover:-translate-y-0.5"
            aria-label="Try Creative Flow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M14.752 11.168l-6.518-3.759A1 1 0 006.5 8.26v7.48a1 1 0 001.734.852l6.518-3.759a1 1 0 000-1.664z"
              />
            </svg>
            Try Creative Flow
          </NuxtLink>
        </div>
      </div>
    </section>
    <!-- ===== /Creative Flow block ===== -->

    <Logos />
    <Features />
    <KPIStripe />
    <Testimonials />
    <CTA />
  </div>
</template>
