import { createContext, useState } from 'react'
import { getCookie, setCookie, removeCookie } from './helpers'

export const Store = createContext()

export function StoreProvider({ children }) {
  const [isAuth, setIsAuth] = useState(() => {
    return !!getCookie('token')
  })

  const state = {
    isAuth,
    logIn: (token) => {
      setCookie('token', token)
      setIsAuth(true)
    },
    logOut: () => {
      removeCookie('token')
      setIsAuth(false)
    },
  }

  return <Store.Provider value={state}>{children}</Store.Provider>
}
