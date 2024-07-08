export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { to, subject, markdown } = body

  try {
    await sendMail({ to, subject, markdown, event })
  }
  catch (e) {
    console.trace(String(e))
    return { error: String(e), stack: (e as Error).stack }
  }
  return { ok: true }
})
