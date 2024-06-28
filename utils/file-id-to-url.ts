import { DIRECTUS_URL } from './directus'

export function fileIdToURL(fileId: string, accessToken?: string | null) {
  if (fileId && accessToken) {
    return `${DIRECTUS_URL}/assets/${fileId}?access_token=${accessToken}`
  }
  else if (fileId) {
    return `${DIRECTUS_URL}/assets/${fileId}`
  }
  else {
    return ''
  }
}
