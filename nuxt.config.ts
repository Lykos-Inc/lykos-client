export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@nuxt/test-utils',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost/api' // O Traefik responde na porta 80
    }
  },

  imports:{
    dirs:[
      'composables',
      'composables/**',
      'services'
    ]
  },

  css: [
    '~/assets/css/main.css'
  ],

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    storageKey: 'lykos-theme'
  }
})
