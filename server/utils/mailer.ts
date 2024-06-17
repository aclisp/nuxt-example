import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

let mailer: Transporter

export async function getMailer() {
  if (mailer) {
    return mailer
  }

  const config = useRuntimeConfig()

  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.qq.com',
    auth: {
      user: config.sendmailUser,
      pass: config.sendmailPass,
    },
    secure: true,
  })
  const ok = await transporter.verify()
  if (ok) {
    mailer = transporter
    console.info(`mailer is init success with ${config.sendmailUser}`)
    return mailer
  }

  return null
}
