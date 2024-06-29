import { shallowRef } from 'vue'

type Login = {
  isLoggedIn: boolean
  name: string
  avatar: string
}

export const useLogin = () => {
  return useState<Login>('login', () => {
    return shallowRef({
      isLoggedIn: false,
      name: '',
      avatar: '',
    })
  })
}
