'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: string
  category: string
  image: string
  description?: string
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    details: ['']
  })
  const [isBulkAdding, setIsBulkAdding] = useState(false)
  const [bulkProducts, setBulkProducts] = useState([
    { name: '', price: '', category: '', image: '', description: '' }
  ])
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
    // Load products from localStorage
    const storedProducts = localStorage.getItem('products')
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    }
  }, [router])

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const product: Product = {
        id: products.length + 1,
        name: newProduct.name,
        price: newProduct.price,
        category: newProduct.category,
        image: newProduct.image,
        description: newProduct.description
      }
      
      const updatedProducts = [...products, product]
      setProducts(updatedProducts)
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      
      setIsAddingProduct(false)
      setNewProduct({
        name: '',
        price: '',
        category: '',
        image: '',
        description: '',
        details: ['']
      })
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleDeleteProduct = async (id: number) => {
    try {
      const updatedProducts = products.filter(product => product.id !== id)
      setProducts(updatedProducts)
      localStorage.setItem('products', JSON.stringify(updatedProducts))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Paneli</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setIsBulkAdding(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Toplu Ürün Ekle
              </button>
              <button
                onClick={() => setIsAddingProduct(true)}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Yeni Ürün Ekle
              </button>
            </div>
          </div>

          {isAddingProduct && (
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-bold mb-4">Yeni Ürün Ekle</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">Ürün Adı</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Fiyat</label>
                  <input
                    type="text"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Kategori</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900"
                    required
                  >
                    <option value="">Kategori Seçin</option>
                    <option value="Yüzükler">Yüzükler</option>
                    <option value="Kolyeler">Kolyeler</option>
                    <option value="Küpeler">Küpeler</option>
                    <option value="Bileklikler">Bileklikler</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Görsel URL</label>
                  <input
                    type="text"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Açıklama</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  >
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          )}

          {isBulkAdding && (
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-bold mb-4">Toplu Ürün Ekle</h2>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  // Her ürüne id ata ve ekle
                  const startingId = products.length + 1
                  const newProducts = bulkProducts.map((p, i) => ({
                    id: startingId + i,
                    ...p
                  }))
                  const updatedProducts = [...products, ...newProducts]
                  setProducts(updatedProducts)
                  localStorage.setItem('products', JSON.stringify(updatedProducts))
                  setIsBulkAdding(false)
                  setBulkProducts([{ name: '', price: '', category: '', image: '', description: '' }])
                }}
                className="space-y-4"
              >
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-2 text-xs font-medium text-gray-900 uppercase">Ad</th>
                        <th className="px-2 py-2 text-xs font-medium text-gray-900 uppercase">Fiyat</th>
                        <th className="px-2 py-2 text-xs font-medium text-gray-900 uppercase">Kategori</th>
                        <th className="px-2 py-2 text-xs font-medium text-gray-900 uppercase">Görsel URL</th>
                        <th className="px-2 py-2 text-xs font-medium text-gray-900 uppercase">Açıklama</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bulkProducts.map((product, idx) => (
                        <tr key={idx}>
                          <td className="px-2 py-1">
                            <input
                              type="text"
                              value={product.name}
                              onChange={e => {
                                const arr = [...bulkProducts]
                                arr[idx].name = e.target.value
                                setBulkProducts(arr)
                              }}
                              className="w-32 border rounded px-2 py-1 text-sm text-gray-900"
                              required
                            />
                          </td>
                          <td className="px-2 py-1">
                            <input
                              type="text"
                              value={product.price}
                              onChange={e => {
                                const arr = [...bulkProducts]
                                arr[idx].price = e.target.value
                                setBulkProducts(arr)
                              }}
                              className="w-20 border rounded px-2 py-1 text-sm text-gray-900"
                              required
                            />
                          </td>
                          <td className="px-2 py-1">
                            <select
                              value={product.category}
                              onChange={e => {
                                const arr = [...bulkProducts]
                                arr[idx].category = e.target.value
                                setBulkProducts(arr)
                              }}
                              className="w-28 border rounded px-2 py-1 text-sm text-gray-900"
                              required
                            >
                              <option value="">Kategori Seçin</option>
                              <option value="Yüzükler">Yüzükler</option>
                              <option value="Kolyeler">Kolyeler</option>
                              <option value="Küpeler">Küpeler</option>
                              <option value="Bileklikler">Bileklikler</option>
                            </select>
                          </td>
                          <td className="px-2 py-1">
                            <input
                              type="text"
                              value={product.image}
                              onChange={e => {
                                const arr = [...bulkProducts]
                                arr[idx].image = e.target.value
                                setBulkProducts(arr)
                              }}
                              className="w-40 border rounded px-2 py-1 text-sm text-gray-900"
                              required
                            />
                          </td>
                          <td className="px-2 py-1">
                            <input
                              type="text"
                              value={product.description}
                              onChange={e => {
                                const arr = [...bulkProducts]
                                arr[idx].description = e.target.value
                                setBulkProducts(arr)
                              }}
                              className="w-40 border rounded px-2 py-1 text-sm text-gray-900"
                            />
                          </td>
                          <td className="px-2 py-1">
                            {bulkProducts.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  setBulkProducts(bulkProducts.filter((_, i) => i !== idx))
                                }}
                                className="text-red-500 hover:text-red-700 text-xs"
                              >
                                Sil
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setBulkProducts([...bulkProducts, { name: '', price: '', category: '', image: '', description: '' }])}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                  >
                    Satır Ekle
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsBulkAdding(false)
                      setBulkProducts([{ name: '', price: '', category: '', image: '', description: '' }])
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                  >
                    Ürünleri Kaydet
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Ürün
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.price} TL</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 