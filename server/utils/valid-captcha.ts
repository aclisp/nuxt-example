const imgidTrash: string[] = []
const maxSize = 100

export async function validCaptcha(imgid: string, captcha: string, event: HandlerEvent) {
  if (imgidTrash.includes(imgid)) return false

  const expectedCaptcha = await joseDecrypt(imgid, event)
  if (Number(expectedCaptcha) !== Number(captcha)) return false

  imgidTrash.push(imgid)
  if (imgidTrash.length > maxSize) {
    imgidTrash.shift()
  }

  return true
}
