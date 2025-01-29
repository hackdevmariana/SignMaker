export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    '@pinia/nuxt',
    'usebootstrap',
    'v-gsap-nuxt'
  ],
  devtools: { enabled: true },
  css: [
    '@/assets/css/style.css',
  ]
})