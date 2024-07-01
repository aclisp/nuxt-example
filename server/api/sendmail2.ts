import { SMTPClient } from 'emailjs'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const mailer = new SMTPClient({
    user: config.sendmailUser,
    password: config.sendmailPass,
    host: 'smtp.qq.com',
    port: 465,
    ssl: true,
  })

  const body = await readBody(event)
  const { to, subject, text } = body

  try {
    await mailer.sendAsync({
      from: config.sendmailUser,
      to, subject, text,
    })
  }
  catch (e) {
    console.trace(String(e))
    return { error: String(e) }
  }
  return { ok: true }
})
