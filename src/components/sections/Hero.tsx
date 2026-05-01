'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-charcoal-950"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C9A84C 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Gold accent top-right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-500/5 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <div className="text-white animate-fade-in-up">
            <p className="section-subtitle text-gold-400 mb-4">
              Liderazgo · Ventas · Comunicación
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transforma tu{' '}
              <span className="text-gold-400">Liderazgo</span>{' '}
              y eleva tu{' '}
              <span className="text-gold-400">Impacto</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              Soy Francis Dadus — consultora, coach y conferencista con amplia trayectoria
              en el sector financiero y empresarial de República Dominicana. Acompaño a
              líderes y profesionales a comunicar con poder, vender con estrategia y
              liderar con propósito.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#servicios" className="btn-gold">
                Ver Servicios <ArrowRight size={18} />
              </a>
              <Link href="/tienda" className="btn-outline-gold border-gold-400 text-gold-400 hover:bg-gold-500 hover:text-white">
                Explorar Tienda
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span>+15 años de experiencia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span>Gerente · Asociación Cibao</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span>Conferencista Internacional</span>
              </div>
            </div>
          </div>

          {/* Photo column */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
            {/* Decorative ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[380px] h-[380px] rounded-full border-2 border-gold-500/30 animate-pulse" />
            </div>

            <div className="relative w-[320px] h-[400px] sm:w-[380px] sm:h-[460px]">
              {/* Gold frame */}
              <div className="absolute inset-0 bg-gold-gradient rounded-3xl rotate-3 opacity-60" />
              <div className="absolute inset-0 bg-charcoal-800 rounded-3xl -rotate-1" />

              {/* Profile image */}
              <Image
                src="https://ik.imagekit.io/202507/FD/FrancisDadus.jpeg"
                alt="Francis Dadus"
                fill
                className="object-cover rounded-3xl relative z-10"
                priority
                unoptimized
              />

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-gold-500 text-white rounded-2xl px-4 py-3 shadow-xl z-20">
                <p className="text-xs font-medium opacity-90">Gerente de Ventas</p>
                <p className="text-sm font-bold">Asociación Cibao</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#sobre-mi"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-400 animate-bounce"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  )
}
