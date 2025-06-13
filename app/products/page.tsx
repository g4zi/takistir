import Image from 'next/image'
import Link from 'next/link'

const products = [
  {
    id: 1,
    name: 'Altın Kaplama Yüzük',
    slug: 'altin-kaplama-yuzuk',
    price: '1.299',
    image: '/products/ring1.jpg',
    category: 'Yüzükler'
  },
  {
    id: 2,
    name: 'İnci Kolye',
    slug: 'inci-kolye',
    price: '899',
    image: '/products/necklace1.jpg',
    category: 'Kolyeler'
  },
  {
    id: 3,
    name: 'Elmas Küpe',
    slug: 'elmas-kupeler',
    price: '2.499',
    image: '/products/earring1.jpg',
    category: 'Küpeler'
  },
  {
    id: 4,
    name: 'Gümüş Bileklik',
    slug: 'gumus-bileklik',
    price: '599',
    image: '/products/bracelet1.jpg',
    category: 'Bileklikler'
  },
  // Daha fazla ürün eklenebilir
]

export default function ProductsPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tüm Ürünler</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select className="px-4 py-2 border rounded-lg">
            <option value="">Kategori Seçin</option>
            <option value="yuzukler">Yüzükler</option>
            <option value="kolyeler">Kolyeler</option>
            <option value="kupeler">Küpeler</option>
            <option value="bileklikler">Bileklikler</option>
          </select>
          
          <select className="px-4 py-2 border rounded-lg">
            <option value="">Fiyat Aralığı</option>
            <option value="0-500">0 - 500 TL</option>
            <option value="500-1000">500 - 1000 TL</option>
            <option value="1000-2000">1000 - 2000 TL</option>
            <option value="2000+">2000 TL ve üzeri</option>
          </select>
          
          <select className="px-4 py-2 border rounded-lg">
            <option value="">Sıralama</option>
            <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
            <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
            <option value="name-asc">İsim (A-Z)</option>
            <option value="name-desc">İsim (Z-A)</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.slug}`}
              className="group"
            >
              <div className="relative h-80 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-lg font-bold">{product.price} TL</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
} 