// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  runtimeConfig: {
    sendmailUser: '',
    sendmailPass: '',
    encryptPassword: '',
    directusServerToken: '',
    defaultRoleId: '',
  },
})
