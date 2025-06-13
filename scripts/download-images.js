const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  products: {
    'ring1.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e',
    'necklace1.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
    'earring1.jpg': 'https://images.unsplash.com/photo-1630019852942-f89202989a59',
    'bracelet1.jpg': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a'
  },
  categories: {
    'rings.jpg': 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1',
    'necklaces.jpg': 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e',
    'earrings.jpg': 'https://images.unsplash.com/photo-1630019852942-f89202989a59'
  },
  'hero-bg.jpg': 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0'
};

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const writeStream = fs.createWriteStream(filepath);
        response.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
          resolve();
        });
      } else {
        reject(`Failed to download ${url}`);
      }
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  // Create directories if they don't exist
  if (!fs.existsSync('public/products')) {
    fs.mkdirSync('public/products', { recursive: true });
  }
  if (!fs.existsSync('public/categories')) {
    fs.mkdirSync('public/categories', { recursive: true });
  }

  // Download product images
  for (const [filename, url] of Object.entries(images.products)) {
    const filepath = path.join('public/products', filename);
    console.log(`Downloading ${filename}...`);
    await downloadImage(url, filepath);
  }

  // Download category images
  for (const [filename, url] of Object.entries(images.categories)) {
    const filepath = path.join('public/categories', filename);
    console.log(`Downloading ${filename}...`);
    await downloadImage(url, filepath);
  }

  // Download hero image
  const heroUrl = images['hero-bg.jpg'];
  const heroPath = path.join('public', 'hero-bg.jpg');
  console.log('Downloading hero image...');
  await downloadImage(heroUrl, heroPath);

  console.log('All images downloaded successfully!');
}

downloadAllImages().catch(console.error); 