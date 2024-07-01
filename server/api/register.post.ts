export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { captcha, imgid } = body
  if (Number(decrypt(imgid)) !== Number(captcha)) {
    return { ok: false, msg: '验证码不对' }
  }

  return { ok: true, msg: '请检查邮件' }
})
