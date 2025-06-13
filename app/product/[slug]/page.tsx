import Image from 'next/image'

// Bu fonksiyon gerçek bir API'den veri çekecek şekilde güncellenebilir
async function getProduct(slug: string) {
  // Örnek veri
  return {
    id: 1,
    name: 'Altın Kaplama Yüzük',
    slug: 'altin-kaplama-yuzuk',
    price: '1.299',
    description: 'Özel tasarım altın kaplama yüzük. El işçiliği ile üretilmiş, zarif ve şık tasarım.',
    images: [
      '/products/ring1.jpg',
      '/products/ring2.jpg',
      '/products/ring3.jpg',
    ],
    details: [
      'Malzeme: Altın Kaplama',
      'Boyut: 17mm',
      'Ağırlık: 5g',
      'Garanti: 2 Yıl'
    ],
    category: 'Yüzükler'
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.category}</p>
            </div>

            <div className="text-2xl font-bold">
              {product.price} TL
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Ürün Açıklaması</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Ürün Detayları</h2>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="text-gray-600">{detail}</li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <button className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors">
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 