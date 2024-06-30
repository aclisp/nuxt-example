export default defineEventHandler(() => {
  const text = '123456'
  const encrypted = encrypt(text)
  const decrypted = decrypt(encrypted)
  return {
    text,
    encrypted,
    decrypted,
  }
})
