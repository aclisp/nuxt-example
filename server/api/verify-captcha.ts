export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { captcha, imgid } = body
  const ok = Number(decrypt(imgid)) === Number(captcha)
  return { ok }
})
