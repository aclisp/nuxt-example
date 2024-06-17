export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const mailer = await getMailer()

  const body = await readBody(event)
  const { to, subject, text } = body

  try {
    await mailer.sendMail({
      from: config.sendmailUser,
      to, subject, text,
    })
  }
  catch (e) {
    return { error: String(e) }
  }
  return { ok: true }
})
