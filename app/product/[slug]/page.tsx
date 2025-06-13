'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '../../context/CartContext'

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  description?: string
}

export default function ProductDetail() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    // Load product from localStorage
    const storedProducts = localStorage.getItem('products')
    if (storedProducts) {
      const products = JSON.parse(storedProducts)
      const foundProduct = products.find((p: Product) => p.id === Number(params.slug))
      if (foundProduct) {
        setProduct({
          ...foundProduct,
          price: Number(foundProduct.price)
        })
      }
    }
  }, [params.slug])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ürün bulunamadı</h2>
          <p className="text-gray-600">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: Number(product.price),
      image: product.image
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Image */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
            <div className="mt-3">
              <h2 className="sr-only">Ürün bilgileri</h2>
              <p className="text-3xl text-gray-900">{product.price} TL</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Açıklama</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Sepete Ekle
                </button>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Kategori</h3>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 