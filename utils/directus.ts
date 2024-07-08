import { authentication, createDirectus, rest } from '@directus/sdk'
import type { AuthenticationStorage, AuthenticationData } from '@directus/sdk'

const storage = () => {
  let store: AuthenticationData | null = null
  const KEY = 'znbcwrefjgfsltiu'

  const get = async () => {
    if (import.meta.server) {
      if (store === null) {
        const { directusServerToken } = useRuntimeConfig()
        store = {
          access_token: directusServerToken,
          refresh_token: null,
          expires: null,
          expires_at: null,
        }
      }

      return store
    }

    const item = localStorage.getItem(KEY)
    if (!item) return null
    return JSON.parse(item) as AuthenticationData
  }

  const set = async (value: AuthenticationData | null) => {
    if (import.meta.server) {
      store = value
      return
    }

    localStorage.setItem(KEY, JSON.stringify(value))
  }

  return { get, set } as AuthenticationStorage
}

let directus: ReturnType<typeof _createDirectus>

export function useDirectus() {
  if (directus) return directus

  const { public: { directusUrl } } = useRuntimeConfig()
  directus = _createDirectus(directusUrl)
  return directus
}

function _createDirectus(directusUrl: string) {
  return createDirectus(directusUrl)
    .with(authentication('json', { storage: storage() }))
    .with(rest())
}
