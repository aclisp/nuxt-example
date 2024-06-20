// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  runtimeConfig: {
    sendmailUser: '',
    sendmailPass: '',
  },
})
