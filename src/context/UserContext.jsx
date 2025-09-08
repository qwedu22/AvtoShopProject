import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  useEffect(()=> { localStorage.setItem('user', JSON.stringify(user)) }, [user])
  const login = (email, password) => {
    // демо-логин (без реального бэкенда)
    setUser({ id: 1, name: 'Demo User', email })
    return { ok: true }
  }
  const logout = () => setUser(null)
  const update = (data) => setUser(u => ({ ...u, ...data }))
  return <UserContext.Provider value={{ user, login, logout, update }}>{children}</UserContext.Provider>
}
export const useUser = () => useContext(UserContext)
