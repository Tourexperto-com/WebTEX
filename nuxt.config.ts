// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
    // Supabase

    // SEO
    // Fontaine
    // Booster
    // Vitalizer
    // GTM
  ],
  // supabase: {

  // },
  app: {
    // Poner etiquetas Head archivo SEO
  },
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700, 800],
    }
  },
  icon: {
    provider: 'iconify',
    collections: ['material-symbols']
  },
  // site: {

  // },
  // booster: {

  // },
  image: {

  },
  // vitalizar: {

  // }
})