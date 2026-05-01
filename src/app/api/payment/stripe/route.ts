import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'
import { createPaymentIntent } from '@/lib/stripe'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, items, total } = body

    const orderId = `FD-STR-${Date.now()}-${randomUUID().slice(0, 6).toUpperCase()}`

    // Create Stripe PaymentIntent
    const intent = await createPaymentIntent(total, 'dop', {
      orderId,
      customerEmail: email,
      customerName:  name,
    })

    // Save pending order
    await prisma.order.create({
      data: {
        id:            orderId,
        customerName:  name,
        customerEmail: email,
        customerPhone: phone,
        total,
        paymentMethod: 'STRIPE',
        status:        'PENDING',
        stripePaymentIntent: intent.id,
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity:  item.quantity,
            price:     item.price,
            name:      item.name,
          })),
        },
      },
    })

    return NextResponse.json({
      clientSecret: intent.client_secret,
      orderId,
    })
  } catch (error: any) {
    console.error('[STRIPE PAYMENT ERROR]', error)
    return NextResponse.json(
      { error: error.message ?? 'Error interno' },
      { status: 500 }
    )
  }
}
