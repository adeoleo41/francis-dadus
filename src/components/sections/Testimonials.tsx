import { Star } from 'lucide-react'

const testimonials = [
  {
    name:     'Ana Rodríguez',
    role:     'Gerente Comercial, Santo Domingo',
    text:     'Francis transformó completamente la manera en que lidero mi equipo. Sus herramientas de comunicación son prácticas y los resultados se vieron desde el primer mes.',
    rating:   5,
    initials: 'AR',
  },
  {
    name:     'Carlos Méndez',
    role:     'Emprendedor, Santiago',
    text:     'El taller de ventas consultivas fue una revelación. Pasé de cerrar 2 de cada 10 propuestas a cerrar 7. Totalmente recomendado para cualquier profesional de ventas.',
    rating:   5,
    initials: 'CM',
  },
  {
    name:     'Laura Jiménez',
    role:     'Directora de RRHH',
    text:     'Contratamos a Francis para un taller corporativo y el impacto fue inmediato. El equipo quedó motivado, con herramientas claras y una visión compartida.',
    rating:   5,
    initials: 'LJ',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-charcoal-950">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Testimonios
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Lo que dicen mis <span className="text-gold-400">clientes</span>
          </h2>
          <div className="w-16 h-1 bg-gold-500 rounded-full mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-charcoal-800 border border-charcoal-700 rounded-2xl p-7 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-gold-400 fill-gold-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed italic flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Person */}
              <div className="flex items-center gap-3 pt-3 border-t border-charcoal-700">
                <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
