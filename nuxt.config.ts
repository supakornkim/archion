// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'Archion — AI that turns goals into momentum',
      meta: [
        {
          name: 'description',
          content:
            'Empower your team with AI that drives progress, focus, and alignment — effortlessly.',
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'Archion' },
        {
          property: 'og:description',
          content:
            'Empower your team with AI that drives progress, focus, and alignment — effortlessly.',
        },
        { property: 'og:type', content: 'website' },
      ],
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/globals.css',
    viewer: false,
  },
})
