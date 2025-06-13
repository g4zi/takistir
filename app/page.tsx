'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const jewelryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    alt: 'Altın Yüzük',
    title: 'Altın Yüzük',
    description: 'El işçiliği ile üretilmiş özel tasarım'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    alt: 'İnci Kolye',
    title: 'İnci Kolye',
    description: 'Doğal inci ve altın detaylar'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
    alt: 'Elmas Küpe',
    title: 'Elmas Küpe',
    description: 'Pırlanta ve altın kombinasyonu'
  }
]

export default function Home() {
  const { scrollYProgress } = useScroll()
  const [rotation, setRotation] = useState(0)

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100])

  const diamondY = useTransform(scrollYProgress, [0.2, 0.4], [100, 0])
  const diamondScale = useTransform(scrollYProgress, [0.2, 0.4], [0.5, 1])
  const diamondOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])

  const jewelryY = useTransform(scrollYProgress, [0.4, 0.6], [100, 0])
  const jewelryOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])

  // Sparkle opacity and scale based on scroll
  const sparkleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15], [0, 0.2, 1])
  const sparkleScale = useTransform(scrollYProgress, [0, 0.08, 0.15], [0.7, 0.7, 1])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const newRotation = (scrollPosition / 10) % 360
      setRotation(newRotation)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden"
      >
        {/* Glow background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-pink-400/30 via-fuchsia-400/20 to-indigo-400/30 blur-3xl animate-pulse" />
        </div>
        {/* Sparkle effects */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ opacity: sparkleOpacity, scale: sparkleScale }}
        >
          {[...Array(14)].map((_, i) => {
            const left = 10 + Math.random() * 80;
            const top = 10 + Math.random() * 80;
            const delay = Math.random() * 2;
            const size = 18 + Math.random() * 24;
            return (
              <span
                key={i}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${delay}s`,
                }}
                className="absolute block star-sparkle"
              >
                <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#glow)" opacity="0.8">
                    <line x1="16" y1="2" x2="16" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="16" x2="30" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="6" y1="6" x2="26" y2="26" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                    <line x1="26" y1="6" x2="6" y2="26" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                  </g>
                  <defs>
                    <filter id="glow" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse">
                      <feGaussianBlur stdDeviation="2" result="blur"/>
                      <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
              </span>
            )
          })}
        </motion.div>
        <div className="text-center relative z-20">
          <h1 className="text-7xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg animate-gradient-move">Taktakistir</h1>
          <p className="text-2xl mb-10 text-gray-200 font-medium bg-gradient-to-r from-white via-fuchsia-200 to-pink-200 bg-clip-text text-transparent animate-gradient-move">En şık takı ve aksesuarlar için doğru adres</p>
          <Link
            href="/products"
            className="relative inline-block px-12 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-300 animate-glow"
          >
            <span className="relative z-10">Keşfet</span>
            <span className="absolute inset-0 rounded-full bg-white/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </motion.div>

      {/* Diamond Section */}
      <motion.div
        style={{ y: diamondY, scale: diamondScale, opacity: diamondOpacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full h-full">
          {/* Light Rays */}
          <div className="absolute inset-0">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="light-ray"
                style={{
                  transform: `rotate(${i * 15}deg)`,
                }}
              />
            ))}
          </div>

          {/* Diamond */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[600px] h-[600px] diamond-glow">
              <Image
                src="/products/heart-gem.png"
                alt="Kalp Şeklinde Değerli Taş"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Sparkle Effects */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="sparkle"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Jewelry Section */}
      <motion.div
        style={{ y: jewelryY, opacity: jewelryOpacity }}
        className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Özel Koleksiyonumuz</h2>
            <p className="text-xl text-gray-300">En değerli parçalarımızı keşfedin</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jewelryImages.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <Link
                    href="/products"
                    className="inline-block bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    İncele
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Kalite Garantisi</h3>
              <p className="text-gray-400">En kaliteli malzemeler ve işçilik</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Hızlı Teslimat</h3>
              <p className="text-gray-400">Güvenli ve hızlı kargo</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Güvenli Ödeme</h3>
              <p className="text-gray-400">256-bit SSL güvenliği</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 