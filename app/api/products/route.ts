import { NextResponse } from 'next/server'

// In-memory storage for products (replace with database in production)
let products: any[] = []

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const product = await request.json()
  product.id = products.length + 1
  products.push(product)
  return NextResponse.json(product)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  products = products.filter(product => product.id !== id)
  return NextResponse.json({ success: true })
} 