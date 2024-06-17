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

  transporter.verify(function (error) {
    if (error) {
      console.error(error)
    }
    else {
      console.info(`${config.sendmailUser} : the mail server is ready to take our messages`)
    }
  })
  mailer = transporter
  return mailer
}
