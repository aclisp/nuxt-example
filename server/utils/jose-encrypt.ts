import * as jose from 'jose'

export async function joseEncrypt(text: string, event: HandlerEvent) {
  const { encryptPassword } = useRuntimeConfig(event)
  console.log(`encryptPassword = (${encryptPassword})`)
  const secret = decodeBase64Url(encryptPassword)
  console.log(`secret = ${secret} (${secret.length})`)
  const jwt = await new jose.EncryptJWT()
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setSubject(text)
    .encrypt(secret)
  return jwt
}

export async function joseDecrypt(encrypted: string, event: HandlerEvent) {
  const { encryptPassword } = useRuntimeConfig(event)
  const secret = decodeBase64Url(encryptPassword)
  const { payload } = await jose.jwtDecrypt(encrypted, secret)
  return payload.sub!
}
