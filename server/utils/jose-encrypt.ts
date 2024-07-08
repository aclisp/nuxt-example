import * as jose from 'jose'

export async function joseEncrypt(text: string) {
  const { encryptPassword } = useRuntimeConfig()
  const secret = jose.base64url.decode(encryptPassword)
  const jwt = await new jose.EncryptJWT()
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setSubject(text)
    .encrypt(secret)
  return jwt
}

export async function joseDecrypt(encrypted: string) {
  const { encryptPassword } = useRuntimeConfig()
  const secret = jose.base64url.decode(encryptPassword)
  const { payload } = await jose.jwtDecrypt(encrypted, secret)
  return payload.sub!
}
