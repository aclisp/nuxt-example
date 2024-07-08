export default defineEventHandler(async (event) => {
  const random = parseInt(String(Math.random() * 900000 + 100000))
  const p = captchapng(80, 32, random)
  p.color(0, 0, 0, 0) // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255) // Second color: paint (red, green, blue, alpha)
  const img = p.getBase64()
  const imgid = await joseEncrypt(random.toString(), event)
  return { img, imgid }
})
