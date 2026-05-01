import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

const strengths = [
  'Gerente de Ventas — Asociación Cibao (Medios de Pagos y Alianzas)',
  'Experta en estrategias de ventas consultivas y liderazgo efectivo',
  'Coach y mentora en comunicación asertiva y comunicación de alto impacto',
  'Conferencista en eventos corporativos, institucionales y formativos',
  'Emprendedora con visión estratégica y enfoque en resultados medibles',
]

const gallery = [
  { src: 'https://ik.imagekit.io/202507/FD/francis_leadership.jpeg', alt: 'Francis liderando', cols: 'col-span-2 row-span-2' },
  { src: 'https://ik.imagekit.io/202507/FD/francis_group.jpeg',      alt: 'Francis con equipo', cols: '' },
  { src: 'https://ik.imagekit.io/202507/FD/francis_coaching.jpeg',   alt: 'Francis coaching',   cols: '' },
]

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 bg-gray-light">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo mosaic */}
          <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[450px]">
            {gallery.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl ${img.cols} ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
            ))}
            {/* Gold accent block */}
            <div className="relative overflow-hidden rounded-2xl bg-gold-500 flex items-center justify-center p-4 col-span-1 row-span-1">
              <div className="text-center text-white">
                <p className="font-serif text-3xl font-bold">15+</p>
                <p className="text-xs font-medium mt-1">Años de<br/>Trayectoria</p>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div>
            <p className="section-subtitle">Sobre Mí</p>
            <h2 className="section-title mb-6">
              Profesional con propósito,<br />
              <span className="text-gold-500">líder con visión</span>
            </h2>
            <div className="gold-divider" />

            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                Soy <strong className="text-charcoal-950">Francis Dadus</strong>, una profesional dominicana con más de
                15 años de experiencia en ventas estratégicas, liderazgo organizacional y
                comunicación de impacto. Como Gerente de Ventas de la Asociación Cibao, he
                construido alianzas de alto valor y liderado equipos hacia resultados excepcionales.
              </p>
              <p>
                Mi pasión por el desarrollo humano me llevó a convertirme en coach y mentora,
                ayudando a líderes, emprendedores y profesionales a desbloquear su potencial,
                comunicar con autenticidad y vender desde el valor que ofrecen.
              </p>
              <p>
                A través de mis talleres, cursos y sesiones personalizadas, acompaño a personas
                y organizaciones en la República Dominicana y el Caribe a transformar la manera
                en que lideran, se comunican y crean impacto.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {strengths.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a href="#contacto" className="btn-gold">
              Trabajemos Juntos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
