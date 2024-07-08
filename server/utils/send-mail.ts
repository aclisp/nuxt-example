type SendMailOptions = {
  to: string
  subject: string
  markdown: string
}

export async function sendMail(options: SendMailOptions) {
  const { directusServerToken, sendmailWebhook, public: { directusUrl } } = useRuntimeConfig()
  return await $fetch(`${directusUrl}${sendmailWebhook}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${directusServerToken}`,
    },
    body: options,
  })
}
