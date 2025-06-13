'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  name: string
  email: string
  password: string
  phone?: string
  address?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
  updateUser: (updatedUser: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // İlk yüklemede localStorage'dan oku
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user')
      if (stored) setUser(JSON.parse(stored))
    }
  }, [])

  // Giriş yap
  const login = (email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (found) {
      setUser(found)
      localStorage.setItem('user', JSON.stringify(found))
      return true
    }
    return false
  }

  // Kayıt ol
  const register = (name: string, email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === email)) return false
    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    return true
  }

  // Çıkış yap
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  // Kullanıcı bilgilerini güncelle
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 