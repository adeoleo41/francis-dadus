import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Video, Users } from 'lucide-react'

const featured = [
  {
    id:          '1',
    slug:        'masterclass-ventas-consultivas',
    name:        'Masterclass: Ventas Consultivas',
    description: 'Aprende el método probado para vender desde el valor, no desde la presión. 6 módulos en video + material descargable.',
    price:       4500,
    type:        'COURSE_ONLINE',
    icon:        Video,
    imageUrl:    'https://ik.imagekit.io/202507/FD/franciss_visa.jpeg',
    badge:       'Más Popular',
    badgeColor:  'bg-gold-500',
  },
  {
    id:          '2',
    slug:        'taller-liderazgo-comunicacion',
    name:        'Taller: Liderazgo & Comunicación',
    description: 'Workshop en vivo (Zoom) de 4 horas. Herramientas prácticas para liderar y comunicar con impacto. Grupos reducidos.',
    price:       3200,
    type:        'COURSE_LIVE',
    icon:        Users,
    imageUrl:    'https://ik.imagekit.io/202507/FD/francis_talent.jpeg',
    badge:       'En Vivo',
    badgeColor:  'bg-navy-700',
  },
  {
    id:          '3',
    slug:        'libro-digital-lidera-con-proposito',
    name:        'Libro Digital: Lidera con Propósito',
    description: 'Guía práctica de liderazgo auténtico para profesionales dominicanos. PDF + audiolibro incluido.',
    price:       1200,
    type:        'BOOK_DIGITAL',
    icon:        BookOpen,
    imageUrl:    'https://ik.imagekit.io/202507/FD/francis_leadership.jpeg',
    badge:       'Digital',
    badgeColor:  'bg-gold-700',
  },
]

function formatDOP(amount: number) {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency', currency: 'DOP', minimumFractionDigits: 0,
  }).format(amount)
}

export default function FeaturedProducts() {
  return (
    <section id="recursos" className="py-24 bg-gray-50">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16">
          <div>
            <p className="section-subtitle">Tienda</p>
            <h2 className="section-title">
              Recursos <span className="text-gold-500">Exclusivos</span>
            </h2>
            <div className="gold-divider" />
          </div>
          <Link href="/tienda" className="btn-outline-gold whitespace-nowrap">
            Ver Todo <ArrowRight size={16} />
          </Link>
        </div>

        {/* Product cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => {
            const Icon = product.icon
            return (
              <div key={product.id} className="card group overflow-hidden">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {product.badge}
                  </span>
                  <div className="absolute bottom-4 left-4">
                    <Icon size={20} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-charcoal-950 mb-2 group-hover:text-gold-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-gold-500">
                      {formatDOP(product.price)}
                    </p>
                    <Link
                      href={`/tienda`}
                      className="btn-dark text-sm py-2 px-4"
                    >
                      Comprar
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
