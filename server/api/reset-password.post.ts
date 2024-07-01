import { updateUser, readUsers } from '@directus/sdk'
import directus from '~/utils/directus'

export default defineWrappedResponseHandler(async (event) => {
  const body = await readBody(event)
  const { email, captcha, imgid } = body
  if (Number(decrypt(imgid)) !== Number(captcha)) {
    return { ok: false, msg: '验证码不对' }
  }

  const data = await directus.request(readUsers({
    filter: { email: { _eq: email } },
  }))
  if (data.length == 0) {
    return { ok: false, msg: `这个邮箱 ${email} 还未注册` }
  }

  const randomPassword = parseInt(String(Math.random() * 900000 + 100000)).toString()
  const { sendmailUser } = useRuntimeConfig(event)
  await directus.request(updateUser(data[0].id, {
    password: randomPassword,
  }))

  const mailer = await getMailer()
  await mailer.sendMail({
    from: `Email Engine <${sendmailUser}>`,
    to: email,
    subject: '您的密码已重置',
    text: `新密码是 ${randomPassword}`,
  })

  return { ok: true, msg: '密码已重置，请检查邮件中的新密码' }
})
