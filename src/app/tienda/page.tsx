'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, BookOpen, Video, Users, Filter } from 'lucide-react'
import { useCart } from '@/components/store/CartProvider'
import type { Product, ProductType } from '@/types'
import { PRODUCT_TYPE_LABELS, formatDOP } from '@/types'

// ─── Static product catalog (replace with API call in production) ─────────────
const products: Product[] = [
  {
    id: '1', slug: 'masterclass-ventas-consultivas',
    name: 'Masterclass: Ventas Consultivas', price: 4500,
    currency: 'DOP', type: 'COURSE_ONLINE', isActive: true, isFeatured: true,
    imageUrl: 'https://ik.imagekit.io/202507/FD/franciss_visa.jpeg',
    description: '6 módulos en video + material descargable. Aprende el método probado para vender desde el valor. Acceso de por vida.',
  },
  {
    id: '2', slug: 'taller-liderazgo-comunicacion',
    name: 'Taller en Vivo: Liderazgo & Comunicación', price: 3200,
    currency: 'DOP', type: 'COURSE_LIVE', isActive: true, isFeatured: true,
    imageUrl: 'https://ik.imagekit.io/202507/FD/francis_talent.jpeg',
    description: 'Workshop de 4 horas vía Zoom. Grupos reducidos. Certificado de participación incluido. Próxima fecha: a confirmar.',
  },
  {
    id: '3', slug: 'libro-lidera-con-proposito',
    name: 'Libro Digital: Lidera con Propósito', price: 1200,
    currency: 'DOP', type: 'BOOK_DIGITAL', isActive: true, isFeatured: true,
    imageUrl: 'https://ik.imagekit.io/202507/FD/francis_leadership.jpeg',
    description: 'Guía práctica de liderazgo para profesionales dominicanos. PDF + audiolibro. Descarga inmediata tras el pago.',
  },
  {
    id: '4', slug: 'sesion-coaching-comunicacion',
    name: 'Sesión de Coaching Individual', price: 5500,
    currency: 'DOP', type: 'COACHING', isActive: true, isFeatured: false,
    imageUrl: 'https://ik.imagekit.io/202507/FD/francis_coaching.jpeg',
    description: 'Sesión 1:1 de 90 minutos vía Zoom. Diagnóstico de tu estilo de comunicación + plan de acción personalizado.',
  },
  {
    id: '5', slug: 'taller-ventas-equipos',
    name: 'Taller Corporativo: Equipos de Alto Rendimiento', price: 0,
    currency: 'DOP', type: 'WORKSHOP', isActive: true, isFeatured: false,
    imageUrl: 'https://ik.imagekit.io/202507/FD/francis_group.jpeg',
    description: 'Taller para empresas e instituciones. Precio según número de participantes. Contáctame para cotización.',
  },
  {
    id: '6', slug: 'kit-liderazgo-comunicacion',
    name: 'Kit: Liderazgo + Comunicación', price: 6500,
    currency: 'DOP', type: 'BUNDLE', isActive: true, isFeatured: false,
    imageUrl: 'https://ik.imagekit.io/202507/FD/francis-coworker.jpeg',
    description: 'Masterclass de Ventas + Libro Digital + 1 sesión de coaching. El paquete más completo. Ahorra RD$2,700.',
  },
]

const FILTERS: { label: string; value: ProductType | 'ALL' }[] = [
  { label: 'Todos',       value: 'ALL' },
  { label: 'Cursos',      value: 'COURSE_ONLINE' },
  { label: 'En Vivo',     value: 'COURSE_LIVE' },
  { label: 'Libros',      value: 'BOOK_DIGITAL' },
  { label: 'Coaching',    value: 'COACHING' },
  { label: 'Talleres',    value: 'WORKSHOP' },
  { label: 'Paquetes',    value: 'BUNDLE' },
]

function typeIcon(type: ProductType) {
  switch (type) {
    case 'COURSE_ONLINE':
    case 'COURSE_LIVE':   return <Video size={14} />
    case 'BOOK_DIGITAL':
    case 'BOOK_PHYSICAL': return <BookOpen size={14} />
    case 'COACHING':
    case 'WORKSHOP':      return <Users size={14} />
    default:              return <ShoppingBag size={14} />
  }
}

export default function TiendaPage() {
  const [filter, setFilter] = useState<ProductType | 'ALL'>('ALL')
  const { addItem, items }  = useCart()

  const visible = filter === 'ALL' ? products : products.filter((p) => p.type === filter)
  const cartCount = items.reduce((a, i) => a + i.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Page header */}
      <div className="bg-navy-950 py-16">
        <div className="section-container text-center">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Recursos Exclusivos
          </p>
          <h1 className="font-serif text-4xl font-bold text-white mb-4">
            Tienda de Francis Dadus
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Cursos, talleres, libros digitales y sesiones de coaching diseñados para
            transformar tu liderazgo y resultados.
          </p>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Filters */}
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          <Filter size={16} className="text-gray-400" />
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.value
                  ? 'bg-gold-500 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gold-400 hover:text-gold-600'
              }`}
            >
              {f.label}
            </button>
          ))}

          {/* Cart quick link */}
          {cartCount > 0 && (
            <Link
              href="/checkout"
              className="ml-auto btn-dark text-sm py-2 px-4 flex items-center gap-2"
            >
              <ShoppingBag size={15} />
              Checkout ({cartCount})
            </Link>
          )}
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {visible.map((product) => (
            <div key={product.id} className="card overflow-hidden group flex flex-col">
              {/* Image */}
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gold-100 flex items-center justify-center">
                    <ShoppingBag size={40} className="text-gold-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {product.isFeatured && (
                  <span className="absolute top-3 left-3 bg-gold-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Destacado
                  </span>
                )}

                <span className="absolute bottom-3 left-3 bg-white/90 text-charcoal-700 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  {typeIcon(product.type)}
                  {PRODUCT_TYPE_LABELS[product.type]}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-lg font-bold text-charcoal-950 mb-2 group-hover:text-gold-600 transition-colors leading-snug">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                  {product.description}
                </p>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    {product.price > 0 ? (
                      <p className="text-2xl font-bold text-gold-500">{formatDOP(product.price)}</p>
                    ) : (
                      <p className="text-sm font-semibold text-charcoal-600">Precio a consultar</p>
                    )}
                    <p className="text-xs text-gray-400">DOP · ITBIS incluido</p>
                  </div>

                  {product.price > 0 ? (
                    <button
                      onClick={() => addItem(product)}
                      className="btn-gold text-sm py-2.5 px-4"
                    >
                      <ShoppingBag size={15} />
                      Añadir
                    </button>
                  ) : (
                    <a href="#contacto" className="btn-outline-gold text-sm py-2.5 px-4">
                      Cotizar
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
            <p>No hay productos en esta categoría aún.</p>
          </div>
        )}
      </div>
    </div>
  )
}
