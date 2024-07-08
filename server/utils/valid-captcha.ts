const imgidTrash: string[] = []
const maxSize = 100

export async function validCaptcha(imgid: string, captcha: string) {
  if (imgidTrash.includes(imgid)) return false

  const expectedCaptcha = await joseDecrypt(imgid)
  if (Number(expectedCaptcha) !== Number(captcha)) return false

  imgidTrash.push(imgid)
  if (imgidTrash.length > maxSize) {
    imgidTrash.shift()
  }

  return true
}
