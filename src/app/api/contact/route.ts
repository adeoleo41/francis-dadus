import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST,
  port:   Number(process.env.EMAIL_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
    }

    // Save to DB
    await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    })

    // Send notification email to Francis
    await transporter.sendMail({
      from:    process.env.EMAIL_FROM,
      to:      process.env.EMAIL_USER,
      subject: `[Contacto Web] ${subject} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #C9A84C; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">Nuevo mensaje de contacto</h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Teléfono:</strong> ${phone ?? 'No indicado'}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-line; color: #444;">${message}</p>
          </div>
        </div>
      `,
    })

    // Auto-reply to sender
    await transporter.sendMail({
      from:    process.env.EMAIL_FROM,
      to:      email,
      subject: `¡Gracias por escribirme, ${name}! — Francis Dadus`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1A1A1A; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #C9A84C; margin: 0;">Francis Dadus</h2>
            <p style="color: #aaa; margin: 4px 0 0;">Liderazgo · Ventas · Comunicación</p>
          </div>
          <div style="padding: 24px;">
            <p>Hola <strong>${name}</strong>,</p>
            <p>Gracias por ponerte en contacto. He recibido tu mensaje sobre <em>"${subject}"</em> y me pondré en contacto contigo muy pronto.</p>
            <p>Mientras tanto, puedes explorar mis recursos y cursos en:</p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/tienda" style="display: inline-block; background: #C9A84C; color: white; padding: 12px 24px; border-radius: 24px; text-decoration: none; font-weight: 600; margin: 16px 0;">Ver Tienda</a>
            <p style="color: #777; font-size: 13px;">Con cariño,<br/><strong>Francis Dadus</strong></p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[CONTACT ERROR]', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
