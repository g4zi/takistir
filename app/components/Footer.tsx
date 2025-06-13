import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">TAKTAKİSTİR</h3>
            <p className="text-gray-400">
              Kaliteli ve özel tasarım takılar sunan online mağazamızda sizlere en iyi hizmeti sunmaktan mutluluk duyuyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  Tüm Ürünler
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/yuzukler" className="text-gray-400 hover:text-white">
                  Yüzükler
                </Link>
              </li>
              <li>
                <Link href="/category/kolyeler" className="text-gray-400 hover:text-white">
                  Kolyeler
                </Link>
              </li>
              <li>
                <Link href="/category/kupeler" className="text-gray-400 hover:text-white">
                  Küpeler
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@taktakistir.com</li>
              <li>Tel: +90 (212) 123 45 67</li>
              <li>Adres: İstanbul, Türkiye</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TAKTAKİSTİR. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
} 