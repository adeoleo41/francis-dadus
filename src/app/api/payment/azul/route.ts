import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { processAzulPayment, isAzulApproved, calculateITBIS } from '@/lib/azul'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email, phone,
      cardNumber, cardExpiry, cardCVV,
      items, total, itbis,
    } = body

    // Validate required fields
    if (!name || !email || !cardNumber || !cardExpiry || !cardCVV) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos del pago' },
        { status: 400 }
      )
    }

    // Generate order ID
    const orderId = `FD-${Date.now()}-${randomUUID().slice(0, 6).toUpperCase()}`
    const computedItbis = itbis ?? calculateITBIS(total)

    // Process payment via Azul
    const azulResponse = await processAzulPayment({
      amount:       total,
      itbis:        computedItbis,
      orderId,
      customerName:  name,
      customerEmail: email,
      cardNumber,
      cardExpiry,
      cardCVV,
      description:  `Compra Francis Dadus — ${items.map((i: any) => i.name).join(', ')}`,
    })

    const approved = isAzulApproved(azulResponse)

    // Persist order in DB regardless of outcome
    const order = await prisma.order.create({
      data: {
        id:            orderId,
        customerName:  name,
        customerEmail: email,
        customerPhone: phone,
        total,
        paymentMethod: 'AZUL',
        status:        approved ? 'PAID' : 'FAILED',
        azulOrderId:   azulResponse.AzulOrderId,
        paymentId:     azulResponse.AuthorizationCode,
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

    if (!approved) {
      return NextResponse.json({
        approved: false,
        message:  azulResponse.ResponseMessage ?? 'Transacción no aprobada',
      })
    }

    return NextResponse.json({
      approved: true,
      orderId:  order.id,
      message:  'Pago aprobado',
    })
  } catch (error: any) {
    console.error('[AZUL PAYMENT ERROR]', error)
    return NextResponse.json(
      { error: error.message ?? 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
