import { Lightbulb, TrendingUp, MessageSquare, Users, BookOpen, Video } from 'lucide-react'

const services = [
  {
    icon: TrendingUp,
    title: 'Consultoría en Ventas',
    description:
      'Estrategias de ventas consultivas para equipos comerciales y profesionales independientes. Aumenta tus cierres, mejora tu proceso y construye relaciones duraderas con tus clientes.',
    tag: 'Ventas',
    color: 'bg-gold-50 border-gold-200',
    iconColor: 'text-gold-500',
  },
  {
    icon: Lightbulb,
    title: 'Consultoría de Liderazgo',
    description:
      'Desarrolla las competencias de liderazgo que necesitas para inspirar equipos, tomar decisiones estratégicas y crear una cultura organizacional de alto rendimiento.',
    tag: 'Liderazgo',
    color: 'bg-charcoal-50 border-charcoal-200',
    iconColor: 'text-charcoal-700',
  },
  {
    icon: MessageSquare,
    title: 'Coaching en Comunicación',
    description:
      'Aprende a comunicar con claridad, confianza y poder. Sesiones personalizadas para mejorar tu presencia ejecutiva, comunicación no verbal y manejo del mensaje.',
    tag: 'Comunicación',
    color: 'bg-gold-50 border-gold-200',
    iconColor: 'text-gold-500',
  },
  {
    icon: Users,
    title: 'Mentoría Profesional',
    description:
      'Acompañamiento personalizado 1:1 para profesionales que quieren acelerar su crecimiento, superar bloqueos y llegar al siguiente nivel en su carrera.',
    tag: 'Mentoría',
    color: 'bg-charcoal-50 border-charcoal-200',
    iconColor: 'text-charcoal-700',
  },
  {
    icon: Video,
    title: 'Talleres & Conferencias',
    description:
      'Talleres presenciales y virtuales (Zoom) para empresas, instituciones y eventos. Contenido dinámico, interactivo y orientado a resultados concretos.',
    tag: 'Talleres',
    color: 'bg-gold-50 border-gold-200',
    iconColor: 'text-gold-500',
  },
  {
    icon: BookOpen,
    title: 'Cursos & Recursos Digitales',
    description:
      'Cursos online, libros digitales y materiales formativos diseñados para que aprendas a tu ritmo y apliques desde el primer día.',
    tag: 'Cursos',
    color: 'bg-charcoal-50 border-charcoal-200',
    iconColor: 'text-charcoal-700',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-subtitle">Servicios</p>
          <h2 className="section-title mb-4">
            ¿Cómo puedo <span className="text-gold-500">ayudarte</span>?
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
            Ofrezco servicios especializados en liderazgo, ventas y comunicación para
            profesionales, emprendedores y organizaciones que buscan resultados reales.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon
            return (
              <div
                key={svc.title}
                className={`card p-7 border ${svc.color} group`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${svc.color}`}>
                  <Icon size={22} className={svc.iconColor} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-2 block">
                  {svc.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-charcoal-950 mb-3 group-hover:text-gold-600 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {svc.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="#contacto" className="btn-gold">
            Agenda una Consulta Gratuita
          </a>
        </div>
      </div>
    </section>
  )
}
