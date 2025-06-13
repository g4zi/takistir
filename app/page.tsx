import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Takı Koleksiyonu"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Özel Tasarım Takılar</h1>
          <p className="text-xl mb-8">Eşsiz tasarımlar, kaliteli malzemeler</p>
          <Link 
            href="/products" 
            className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Koleksiyonu Keşfet
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Kategoriler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.slug}`}
              className="group relative h-80 rounded-lg overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Öne Çıkan Ürünler</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
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
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.price} TL</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

const categories = [
  {
    id: 1,
    name: 'Yüzükler',
    slug: 'yuzukler',
    image: '/categories/rings.jpg'
  },
  {
    id: 2,
    name: 'Kolyeler',
    slug: 'kolyeler',
    image: '/categories/necklaces.jpg'
  },
  {
    id: 3,
    name: 'Küpeler',
    slug: 'kupeler',
    image: '/categories/earrings.jpg'
  }
]

const featuredProducts = [
  {
    id: 1,
    name: 'Altın Kaplama Yüzük',
    slug: 'altin-kaplama-yuzuk',
    price: '1.299',
    image: '/products/ring1.jpg'
  },
  {
    id: 2,
    name: 'İnci Kolye',
    slug: 'inci-kolye',
    price: '899',
    image: '/products/necklace1.jpg'
  },
  {
    id: 3,
    name: 'Elmas Küpe',
    slug: 'elmas-kupeler',
    price: '2.499',
    image: '/products/earring1.jpg'
  },
  {
    id: 4,
    name: 'Gümüş Bileklik',
    slug: 'gumus-bileklik',
    price: '599',
    image: '/products/bracelet1.jpg'
  }
] 