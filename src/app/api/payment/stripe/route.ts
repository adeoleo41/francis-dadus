import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { randomUUID } from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, items, total } = body

    const orderId = `FD-STR-${Date.now()}-${randomUUID().slice(0, 6).toUpperCase()}`
    const siteUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

    // Build Stripe line items from cart
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency:     'dop',
        unit_amount:  Math.round(item.price * 100), // centavos
        product_data: {
          name:        item.name,
          description: `Francis Dadus — ${item.name}`,
        },
      },
      quantity: item.quantity,
    }))

    // Create Stripe Checkout Session (hosted payment page)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode:                 'payment',
      customer_email:       email,
      line_items:           lineItems,
      metadata: {
        orderId,
        customerName:  name,
        customerPhone: phone ?? '',
      },
      success_url: `${siteUrl}/checkout/confirmacion?order=${orderId}`,
      cancel_url:  `${siteUrl}/checkout`,
    })

    // Save pending order in DB before redirecting
    await prisma.order.create({
      data: {
        id:                  orderId,
        customerName:        name,
        customerEmail:       email,
        customerPhone:       phone,
        total,
        paymentMethod:       'STRIPE',
        status:              'PENDING',
        stripePaymentIntent: session.id,
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

    // Return the Stripe hosted checkout URL
    return NextResponse.json({ url: session.url, orderId })
  } catch (error: any) {
    console.error('[STRIPE PAYMENT ERROR]', error)
    return NextResponse.json(
      { error: error.message ?? 'Error interno' },
      { status: 500 }
    )
  }
}
