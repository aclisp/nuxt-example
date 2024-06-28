export default defineNuxtRouteMiddleware(async (to) => {
  console.log(`[middleware:auth] to.path='${to.path}'`)

  const token = await directus.getToken()
  if (token) {
    return
  }

  const redirect = encodeURIComponent(to.path)
  return navigateTo(`/login?redirect=${redirect}`)
})
