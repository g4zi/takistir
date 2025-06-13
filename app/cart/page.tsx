import Image from 'next/image'
import Link from 'next/link'

// Bu veri gerçek bir state management sistemi ile yönetilecek
const cartItems = [
  {
    id: 1,
    name: 'Altın Kaplama Yüzük',
    slug: 'altin-kaplama-yuzuk',
    price: '1.299',
    image: '/products/ring1.jpg',
    quantity: 1
  },
  {
    id: 2,
    name: 'İnci Kolye',
    slug: 'inci-kolye',
    price: '899',
    image: '/products/necklace1.jpg',
    quantity: 2
  }
]

export default function CartPage() {
  const subtotal = cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0)
  const shipping = 29.99
  const total = subtotal + shipping

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Alışveriş Sepeti</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Sepetinizde ürün bulunmamaktadır.</p>
            <Link 
              href="/products" 
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/product/${item.slug}`} className="font-semibold hover:underline">
                      {item.name}
                    </Link>
                    <p className="text-gray-600 mt-1">{item.price} TL</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border rounded-lg">
                        <button className="px-3 py-1 hover:bg-gray-100">-</button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button className="px-3 py-1 hover:bg-gray-100">+</button>
                      </div>
                      <button className="text-red-600 hover:text-red-700">
                        Kaldır
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {(parseFloat(item.price) * item.quantity).toFixed(2)} TL
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold">Sipariş Özeti</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span>{subtotal.toFixed(2)} TL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kargo</span>
                    <span>{shipping.toFixed(2)} TL</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Toplam</span>
                    <span>{total.toFixed(2)} TL</span>
                  </div>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Ödemeye Geç
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
} 