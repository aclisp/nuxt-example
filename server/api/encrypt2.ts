export default defineEventHandler(async () => {
  const text = '123456'
  const encrypted = await joseEncrypt(text)
  const decrypted = await joseDecrypt(encrypted)
  return {
    text,
    encrypted,
    decrypted,
  }
})
