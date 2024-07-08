import { updateUser, readUsers } from '@directus/sdk'
import { useDirectus } from '~/utils/directus'

export default defineWrappedResponseHandler(async (event) => {
  const body = await readBody(event)
  const { email, captcha, imgid } = body
  const valid = await validCaptcha(imgid, captcha)
  if (!valid) {
    return { ok: false, msg: '验证码不对' }
  }

  const { defaultRoleId } = useRuntimeConfig(event)
  const directus = useDirectus()
  const data = await directus.request(readUsers({
    filter: { email: { _eq: email } },
  }))
  if (data.length == 0) {
    return { ok: false, msg: `这个邮箱 ${email} 还未注册` }
  }
  if (data[0].role !== defaultRoleId) {
    return { ok: false, msg: `这个邮箱 ${email} 不允许重置密码` }
  }

  const randomPassword = parseInt(String(Math.random() * 900000 + 100000)).toString()
  await directus.request(updateUser(data[0].id, {
    password: randomPassword,
  }))

  await sendMail({
    to: email,
    subject: '您的密码已重置',
    markdown: `新密码是 ${randomPassword}`,
  })

  return { ok: true, msg: '密码已重置，请检查邮件中的新密码' }
})
