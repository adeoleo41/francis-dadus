'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Send, MapPin, Mail, Phone } from 'lucide-react'

const schema = z.object({
  name:    z.string().min(2, 'Nombre requerido'),
  email:   z.string().email('Email inválido'),
  phone:   z.string().optional(),
  subject: z.string().min(3, 'Asunto requerido'),
  message: z.string().min(20, 'Mensaje muy corto (mínimo 20 caracteres)'),
})

type FormData = z.infer<typeof schema>

export default function Contact() {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast.success('¡Mensaje enviado! Te contactaré pronto.')
      reset()
    } catch {
      toast.error('Error al enviar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" className="py-24 bg-gray-light">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: info */}
          <div>
            <p className="section-subtitle">Contacto</p>
            <h2 className="section-title mb-6">
              Trabajemos <span className="text-gold-500">juntos</span>
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-500 leading-relaxed mt-6 mb-10">
              ¿Listo para transformar tu liderazgo, elevar tus ventas o comunicar con mayor impacto?
              Escríbeme y conversemos sobre cómo puedo ayudarte.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-950">Ubicación</p>
                  <p className="text-gray-500 text-sm">Santo Domingo, República Dominicana</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-950">Email</p>
                  <a href="mailto:hola@francisdadus.com" className="text-gold-600 text-sm hover:underline">
                    hola@francisdadus.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-950">Sesiones online</p>
                  <p className="text-gray-500 text-sm">Disponible vía Zoom para todo el mundo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="font-serif text-xl font-bold text-charcoal-950 mb-6">
              Envíame un mensaje
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nombre completo *
                  </label>
                  <input
                    {...register('name')}
                    placeholder="Tu nombre"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Teléfono (opcional)
                  </label>
                  <input
                    {...register('phone')}
                    placeholder="+1 (809) 000-0000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Asunto *</label>
                <select
                  {...register('subject')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition bg-white"
                >
                  <option value="">Selecciona un tema…</option>
                  <option>Consultoría de Liderazgo</option>
                  <option>Consultoría de Ventas</option>
                  <option>Coaching en Comunicación</option>
                  <option>Taller Corporativo</option>
                  <option>Conferencia / Evento</option>
                  <option>Mentoría Individual</option>
                  <option>Otro</option>
                </select>
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensaje *</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Cuéntame sobre tu proyecto, necesidades o preguntas…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition resize-none"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando…' : (
                  <>
                    Enviar Mensaje <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
