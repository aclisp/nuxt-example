import { DIRECTUS_URL } from './directus'

export function fileIdToURL(fileId: string, accessToken?: string | null, addTs?: number) {
  let ts = ''

  if (fileId && accessToken) {
    if (addTs) ts = `&ts=${addTs}`
    return `${DIRECTUS_URL}/assets/${fileId}?access_token=${accessToken}` + ts
  }
  else if (fileId) {
    if (addTs) ts = `?ts=${addTs}`
    return `${DIRECTUS_URL}/assets/${fileId}` + ts
  }
  else {
    return ''
  }
}
