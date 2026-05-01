'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { CreditCard, Lock, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/components/store/CartProvider'
import { formatDOP } from '@/types'
import Image from 'next/image'

const schema = z.object({
  name:          z.string().min(2, 'Nombre requerido'),
  email:         z.string().email('Email inválido'),
  phone:         z.string().min(10, 'Teléfono requerido'),
  paymentMethod: z.enum(['azul', 'stripe']),
  cardName:      z.string().optional(),
  cardNumber:    z.string().optional(),
  cardExpiry:    z.string().optional(),
  cardCVV:       z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function CheckoutPage() {
  const { items, total, removeItem, clearCart } = useCart()
  const router  = useRouter()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver:     zodResolver(schema),
    defaultValues: { paymentMethod: 'azul' },
  })

  const paymentMethod = watch('paymentMethod')
  const itbis  = parseFloat((total * 0.18).toFixed(2))
  const subtotal = parseFloat((total - itbis).toFixed(2))

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) {
      toast.error('El carrito está vacío')
      return
    }
    setLoading(true)
    try {
      const endpoint = data.paymentMethod === 'azul'
        ? '/api/payment/azul'
        : '/api/payment/stripe'

      const res = await fetch(endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: items.map((i) => ({
            productId: i.product.id,
            name:      i.product.name,
            quantity:  i.quantity,
            price:     i.product.price,
          })),
          total,
          itbis,
        }),
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.error ?? 'Error en el pago')

      if (data.paymentMethod === 'stripe' && result.url) {
        toast.success('Redirigiendo a Stripe…')
        window.location.href = result.url
        return
      }

      if (result.approved) {
        clearCart()
        toast.success('¡Pago aprobado! Revisa tu email.')
        router.push(`/checkout/confirmacion?order=${result.orderId}`)
      } else {
        toast.error(result.message ?? 'Pago no aprobado. Verifica los datos.')
      }
    } catch (err: any) {
      toast.error(err.message ?? 'Error procesando el pago')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag size={64} className="text-gold-300 mb-6" />
        <h2 className="font-serif text-2xl font-bold text-charcoal-950 mb-3">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-500 mb-6">Agrega productos desde la tienda para continuar.</p>
        <a href="/tienda" className="btn-gold">Ir a la Tienda</a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="section-container">
        <h1 className="font-serif text-3xl font-bold text-charcoal-950 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* ── Left: Form ───────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-charcoal-950 mb-5">
                Información del Cliente
              </h2>
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nombre completo *
                    </label>
                    <input
                      {...register('name')}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono *</label>
                    <input
                      {...register('phone')}
                      placeholder="809-000-0000"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </form>
            </div>

            {/* Payment method selector */}
            <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-charcoal-950 mb-5">
                Método de Pago
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {/* Azul */}
                <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'azul' ? 'border-gold-500 bg-gold-50' : 'border-gray-200 hover:border-gold-300'
                }`}>
                  <input
                    {...register('paymentMethod')}
                    type="radio"
                    value="azul"
                    className="text-gold-500"
                  />
                  <div>
                    <p className="font-semibold text-charcoal-950 text-sm">Tarjeta Local (Azul)</p>
                    <p className="text-xs text-gray-500">VISA · Mastercard · AMEX en RD</p>
                  </div>
                </label>

                {/* Stripe */}
                <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'stripe' ? 'border-gold-500 bg-gold-50' : 'border-gray-200 hover:border-gold-300'
                }`}>
                  <input
                    {...register('paymentMethod')}
                    type="radio"
                    value="stripe"
                    className="text-gold-500"
                  />
                  <div>
                    <p className="font-semibold text-charcoal-950 text-sm">Tarjeta Internacional</p>
                    <p className="text-xs text-gray-500">VISA · Mastercard · AMEX vía Stripe</p>
                  </div>
                </label>
              </div>

              {/* Azul card fields */}
              {paymentMethod === 'azul' && (
                <form id="checkout-form" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nombre en la tarjeta
                    </label>
                    <input
                      {...register('cardName')}
                      placeholder="Como aparece en tu tarjeta"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Número de tarjeta
                    </label>
                    <input
                      {...register('cardNumber')}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold-400 transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Vencimiento
                      </label>
                      <input
                        {...register('cardExpiry')}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                      <input
                        {...register('cardCVV')}
                        placeholder="000"
                        maxLength={4}
                        type="password"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold-400 transition"
                      />
                    </div>
                  </div>
                </form>
              )}

              {paymentMethod === 'stripe' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                  Al continuar, serás redirigido de forma segura a Stripe para completar el pago con tu tarjeta internacional.
                </div>
              )}

              {/* Security note */}
              <div className="flex items-center gap-2 mt-5 text-xs text-gray-400">
                <Lock size={13} />
                <span>Pago 100% seguro. Tus datos están encriptados.</span>
              </div>
            </div>
          </div>

          {/* ── Right: Order summary ───────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm sticky top-28">
            <h2 className="font-serif text-lg font-bold text-charcoal-950 mb-5">
              Resumen del Pedido
            </h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 items-start">
                  {product.imageUrl && (
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={product.imageUrl} alt={product.name} fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-charcoal-950 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">Cant: {quantity}</p>
                    <p className="text-sm font-bold text-gold-500">{formatDOP(product.price * quantity)}</p>
                  </div>
                  <button onClick={() => removeItem(product.id)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatDOP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>ITBIS (18%)</span>
                <span>{formatDOP(itbis)}</span>
              </div>
              <div className="flex justify-between font-bold text-charcoal-950 text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-gold-500">{formatDOP(total)}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              form="checkout-form"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <CreditCard size={18} />
              {loading ? 'Procesando…' : `Pagar ${formatDOP(total)}`}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              Al pagar aceptas nuestros{' '}
              <a href="/terminos" className="underline hover:text-gold-500">Términos de Uso</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
