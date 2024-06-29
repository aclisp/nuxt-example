import { authentication, createDirectus, rest } from '@directus/sdk'
import type { AuthenticationStorage, AuthenticationData } from '@directus/sdk'

export const DIRECTUS_URL = 'http://192.168.0.109:8055'

const storage = () => {
  const KEY = 'znbcwrefjgfsltiu'
  const get = async () => {
    if (import.meta.server) return null
    const item = localStorage.getItem(KEY)
    if (!item) return null
    return JSON.parse(item) as AuthenticationData
  }
  const set = async (value: AuthenticationData | null) => {
    localStorage.setItem(KEY, JSON.stringify(value))
  }
  return { get, set } as AuthenticationStorage
}

const directus = createDirectus(DIRECTUS_URL)
  .with(authentication('json', { storage: storage() }))
  .with(rest())

export default directus
