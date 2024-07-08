export default defineEventHandler((event) => {
  const text = '123456'
  const encrypted = encrypt(text, event)
  const decrypted = decrypt(encrypted, event)
  return {
    text,
    encrypted,
    decrypted,
  }
})
