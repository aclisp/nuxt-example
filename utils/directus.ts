import { authentication, createDirectus, rest } from '@directus/sdk'

export const DIRECTUS_URL = 'http://192.168.0.109:8055'

const directus = createDirectus(DIRECTUS_URL).with(authentication('json')).with(rest())

export default directus
