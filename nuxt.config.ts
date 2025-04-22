// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY
  },

  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost'
      }
    }
  },

  nitro: {
    devProxy: {
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true
      }
    }
  },

  compatibilityDate: '2025-01-23'
})