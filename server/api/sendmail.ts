export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const mailer = await getMailer()
  if (!mailer) {
    return { ok: false }
  }

  const body = await readBody(event)
  const { to, subject, text } = body

  await mailer.sendMail({
    from: config.sendmailUser,
    to, subject, text,
  })
  return { ok: true }
})
