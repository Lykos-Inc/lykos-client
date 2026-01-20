export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],
})
