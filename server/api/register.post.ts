import { createUser, readUsers } from '@directus/sdk'
import directus from '~/utils/directus'

export default defineWrappedResponseHandler(async (event) => {
  const body = await readBody(event)
  const { email, name, captcha, imgid } = body
  const valid = await validCaptcha(imgid, captcha)
  if (!valid) {
    return { ok: false, msg: '验证码不对' }
  }

  const data = await directus.request(readUsers({
    filter: { email: { _eq: email } },
  }))
  if (data.length > 0) {
    return { ok: false, msg: `这个邮箱 ${email} 已注册` }
  }

  const randomPassword = parseInt(String(Math.random() * 900000 + 100000)).toString()
  const { defaultRoleId } = useRuntimeConfig(event)
  await directus.request(createUser({
    first_name: name,
    email,
    password: randomPassword,
    role: defaultRoleId,
  }))

  await sendMail({
    to: email,
    subject: '注册信息',
    markdown: `您的密码是 ${randomPassword}`,
  })

  return { ok: true, msg: '注册成功，请检查邮件中的密码' }
})
