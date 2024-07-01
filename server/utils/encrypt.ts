import { scryptSync, randomFillSync, createCipheriv, createDecipheriv } from 'node:crypto'

const algorithm = 'aes-192-cbc'
const keylength = 24 // The key length is dependent on the algorithm.
const salt = 'KlsdERv1'
const encoding = 'base64url'
const ivlength = 16
const ivenclen = 22 // dependent on the encoding.

type Encrypted = {
  encrypted: string
  iv: string
}

export function _encrypt(text: string): Encrypted {
  const { encryptPassword } = useRuntimeConfig()
  const key = scryptSync(encryptPassword, salt, keylength)
  const iv = randomFillSync(new Uint8Array(ivlength))
  const cipher = createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(text, 'utf8', encoding)
  encrypted += cipher.final(encoding)
  return { encrypted, iv: Buffer.from(iv).toString(encoding) }
}

export function encrypt(text: string): string {
  const encrypted = _encrypt(text)
  return encrypted.iv + encrypted.encrypted
}

export function _decrypt(encrypted: Encrypted): string {
  const { encryptPassword } = useRuntimeConfig()
  const key = scryptSync(encryptPassword, salt, keylength)
  const iv = Uint8Array.from(Buffer.from(encrypted.iv, encoding))
  const decipher = createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encrypted.encrypted, encoding, 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export function decrypt(encrypted: string): string {
  const iv = encrypted.substring(0, ivenclen)
  const en = encrypted.substring(ivenclen)
  return _decrypt({ encrypted: en, iv })
}
