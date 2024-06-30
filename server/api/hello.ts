import PNGlib from '../utils/pnglib'

export default defineEventHandler(() => {
  let p = new PNGlib(200, 200, 256) // construcor takes height, weight and color-depth
  p.color(0, 0, 0, 0) // set the background transparent

  for (let i = 0, num = 200 / 10; i <= num; i += 0.01) {
    const x = i * 10
    const y = Math.sin(i) * Math.sin(i) * 50 + 50

    // use a color triad of Microsofts million dollar color
    p.buffer[p.index(Math.floor(x), Math.floor(y - 10))] = p.color(0x00, 0x44, 0xcc)
    p.buffer[p.index(Math.floor(x), Math.floor(y))] = p.color(0xcc, 0x00, 0x44)
    p.buffer[p.index(Math.floor(x), Math.floor(y + 10))] = p.color(0x00, 0xcc, 0x44)
  }

  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      p.buffer[p.index(i + 90, j + 135)] = p.color(0xcc, 0x00, 0x44)
      p.buffer[p.index(i + 80, j + 120)] = p.color(0x00, 0x44, 0xcc)
      p.buffer[p.index(i + 100, j + 130)] = p.color(0x00, 0xcc, 0x44)
    }
  }
  const png = p.getBase64()
  const random = parseInt(String(Math.random() * 900000 + 100000))
  p = captchapng(80, 40, random)
  p.color(0, 0, 0, 0) // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255) // Second color: paint (red, green, blue, alpha)
  const captcha = p.getBase64()

  return {
    hello: random,
    png,
    captcha,
  }
})
