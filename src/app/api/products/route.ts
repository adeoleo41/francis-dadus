import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type     = searchParams.get('type')
  const featured = searchParams.get('featured')

  const where: any = { isActive: true }
  if (type)     where.type      = type
  if (featured) where.isFeatured = featured === 'true'

  const products = await prisma.product.findMany({
    where,
    orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
  })

  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  // Admin-only — add auth middleware in production
  const body = await req.json()
  const product = await prisma.product.create({ data: body })
  return NextResponse.json(product, { status: 201 })
}
