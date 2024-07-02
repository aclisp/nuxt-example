type Login = {
  isLoggedIn: boolean
  name: string
  avatar: string
}

export const useLogin = () => {
  const initial = {
    isLoggedIn: false,
    name: '',
    avatar: '',
  }
  const login = useState<Login>('login', () => shallowRef(initial))
  const resetLogin = () => {
    login.value = initial
  }
  return { login, resetLogin }
}
