import { authentication, createDirectus, rest } from '@directus/sdk'
import type { AuthenticationStorage, AuthenticationData } from '@directus/sdk'

const storage = (event?: HandlerEvent) => {
  let store: AuthenticationData | null = null
  const KEY = 'znbcwrefjgfsltiu'

  const get = async () => {
    if (import.meta.server) {
      if (store === null) {
        const { directusServerToken } = useRuntimeConfig(event)
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

export function useDirectus(event?: HandlerEvent) {
  if (directus) return directus

  directus = _createDirectus(event)
  return directus
}

function _createDirectus(event?: HandlerEvent) {
  const { public: { directusUrl } } = useRuntimeConfig(event)
  return createDirectus(directusUrl)
    .with(authentication('json', { storage: storage(event) }))
    .with(rest())
}
