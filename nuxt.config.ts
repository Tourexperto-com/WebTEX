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
    // Fontaine
    // Booster
    // Vitalizer
    // GTM
    '@nuxtjs/tailwindcss',
    '@nuxtjs/seo',
    '@nuxtjs/i18n'
  ],
  app: {
    // Poner etiquetas Head archivo SEO
  },
  site: {
    url: 'https://tourexperto.com',
    name: 'TourExperto'
  },
  i18n: {
    locales: [
      { code: 'latam', iso: 'es-419' },
      { code: 'ar', iso: 'es-AR' },
      { code: 'es', iso: 'es-ES' }, 
      { code: 'us', iso: 'en-US' },
      { code: 'mx', iso: 'es-MX' }
    ],
    defaultLocale: 'latam',
    strategy: 'prefix_except_default',
    bundle: {
      optimizeTranslationDirective: false
    }
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
  // booster: {

  // },
  image: {

  },
  // vitalizar: {

  // }
})