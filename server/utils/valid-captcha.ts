import { decrypt } from './encrypt'

const imgidTrash: string[] = []
const maxSize = 100

export function validCaptcha(imgid: string, captcha: string): boolean {
  if (imgidTrash.includes(imgid)) return false

  if (Number(decrypt(imgid)) !== Number(captcha)) return false

  imgidTrash.push(imgid)
  if (imgidTrash.length > maxSize) {
    imgidTrash.shift()
  }

  return true
}
