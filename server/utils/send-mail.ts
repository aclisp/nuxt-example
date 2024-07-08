import { DIRECTUS_URL } from '~/utils/directus'

type SendMailOptions = {
  to: string
  subject: string
  markdown: string
}

export async function sendMail(options: SendMailOptions) {
  const { directusServerToken, sendmailWebhook } = useRuntimeConfig()
  return await $fetch(`${DIRECTUS_URL}${sendmailWebhook}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${directusServerToken}`,
    },
    body: options,
  })
}
