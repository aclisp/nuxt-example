export default defineNuxtRouteMiddleware(async (to) => {
  console.log(`[middleware:auth] to.path='${to.path}'`)

  // skip middleware on server
  if (import.meta.server) return

  const directus = useDirectus()
  const token = await directus.getToken()
  if (token) return

  const redirect = encodeURIComponent(to.path)
  return navigateTo(`/login?redirect=${redirect}`)
})
