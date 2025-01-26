export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@pinia/nuxt'],
  devtools: { enabled: true },
  css: [
    '@/assets/css/style.css' // Agrega el archivo CSS global aquí
  ]
})
