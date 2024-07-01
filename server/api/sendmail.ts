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
    console.trace(String(e))
    return { error: String(e), stack: (e as Error).stack }
  }
  return { ok: true }
})
