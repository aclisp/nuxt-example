export function fileIdToURL(fileId: string, accessToken?: string | null, addTs?: number) {
  const { public: { directusUrl } } = useRuntimeConfig()
  let ts = ''

  if (fileId && accessToken) {
    if (addTs) ts = `&ts=${addTs}`
    return `${directusUrl}/assets/${fileId}?access_token=${accessToken}` + ts
  }
  else if (fileId) {
    if (addTs) ts = `?ts=${addTs}`
    return `${directusUrl}/assets/${fileId}` + ts
  }
  else {
    return ''
  }
}
