'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user: authUser, updateUser } = useAuth()
  const router = useRouter()
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!authUser) {
      router.push('/login')
      return
    }
    setUser({
      name: authUser.name,
      email: authUser.email,
      phone: authUser.phone || '',
      address: authUser.address || ''
    })
  }, [authUser, router])

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    // Kullanıcı bilgilerini güncelle
    const updatedUser = {
      ...authUser,
      ...user
    }

    // localStorage'daki users dizisini güncelle
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex((u: any) => u.email === authUser?.email)
    
    if (userIndex !== -1) {
      users[userIndex] = updatedUser
      localStorage.setItem('users', JSON.stringify(users))
      updateUser(updatedUser)
      setMessage('Bilgileriniz başarıyla güncellendi')
    }
  }

  if (!authUser) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profil Bilgileri */}
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Profil Bilgileri</h2>
            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">E-posta</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Telefon</label>
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Adres</label>
                  <textarea
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900"
                  />
                </div>
                {message && (
                  <div className="text-green-600 text-sm">
                    {message}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Bilgileri Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sipariş Geçmişi */}
        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Sipariş Geçmişi</h2>
            <div className="space-y-6">
              <div className="text-gray-500 text-center py-8">
                Henüz siparişiniz bulunmuyor.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 