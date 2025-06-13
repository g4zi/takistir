/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pngimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.robertopirlanta.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig 