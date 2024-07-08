export default defineEventHandler(async (event) => {
  const text = '123456'
  const encrypted = await joseEncrypt(text, event)
  const decrypted = await joseDecrypt(encrypted, event)
  return {
    text,
    encrypted,
    decrypted,
  }
})
