const sampleProducts = [
  {
    id: 1,
    name: "Elmas Yüzük",
    price: "12.999",
    category: "Yüzükler",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=60",
    description: "14 ayar altın üzerine elmas taşlı zarif yüzük. Özel günleriniz için mükemmel bir seçim."
  },
  {
    id: 2,
    name: "İnci Kolye",
    price: "8.499",
    category: "Kolyeler",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=60",
    description: "Doğal inci tanelerinden oluşan şık kolye. Her tarza uyum sağlayan klasik tasarım."
  },
  {
    id: 3,
    name: "Zümrüt Küpe",
    price: "9.999",
    category: "Küpeler",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=60",
    description: "Zümrüt taşlı, altın kaplama küpeler. Göz alıcı tasarımıyla dikkat çekici bir aksesuar."
  },
  {
    id: 4,
    name: "Altın Bileklik",
    price: "15.999",
    category: "Bileklikler",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f743f59?w=800&auto=format&fit=crop&q=60",
    description: "24 ayar altın bileklik. Zarif ve şık tasarımıyla her ortama uyum sağlar."
  },
  {
    id: 5,
    name: "Safir Yüzük",
    price: "14.999",
    category: "Yüzükler",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&auto=format&fit=crop&q=60",
    description: "Safir taşlı, platin kaplama yüzük. Özel günleriniz için unutulmaz bir hediye."
  },
  {
    id: 6,
    name: "Pırlanta Kolye",
    price: "18.999",
    category: "Kolyeler",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=60",
    description: "Pırlanta taşlı, altın kaplama kolye. Göz alıcı parlaklığıyla dikkat çekici bir tasarım."
  },
  {
    id: 7,
    name: "Altın Küpe",
    price: "7.999",
    category: "Küpeler",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=60",
    description: "24 ayar altın küpeler. Minimal tasarımıyla günlük kullanıma uygun."
  },
  {
    id: 8,
    name: "Elmas Bileklik",
    price: "22.999",
    category: "Bileklikler",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f743f59?w=800&auto=format&fit=crop&q=60",
    description: "Elmas taşlı, altın kaplama bileklik. Özel günleriniz için muhteşem bir seçim."
  }
]

// Ürünleri localStorage'a kaydet
localStorage.setItem('products', JSON.stringify(sampleProducts))

console.log('Örnek ürünler başarıyla eklendi!') 