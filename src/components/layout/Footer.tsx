import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin, Youtube, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-white">
      {/* Main footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Image
              src="https://ik.imagekit.io/202507/FD/LogoTipo.jpeg"
              alt="Francis Dadus"
              width={60}
              height={60}
              className="rounded-full mb-4"
              unoptimized
            />
            <h3 className="font-serif text-xl font-bold text-gold-400 mb-3">
              Francis Dadus
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
              Consultora de Liderazgo, Ventas y Comunicación. Acompañando a profesionales
              y empresas a elevar su impacto en República Dominicana y más allá.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/francisdadus"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-gold-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/francisdadus"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-gold-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.youtube.com/@francisdadus"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-400 hover:text-gold-400 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-gold-400 font-semibold uppercase tracking-wider text-xs mb-5">
              Navegación
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                { href: '#sobre-mi',  label: 'Sobre Mí' },
                { href: '#servicios', label: 'Servicios' },
                { href: '#recursos',  label: 'Recursos' },
                { href: '/tienda',    label: 'Tienda' },
                { href: '#contacto',  label: 'Contáctame' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-400 font-semibold uppercase tracking-wider text-xs mb-5">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-gold-400 flex-shrink-0" />
                <a
                  href="mailto:hola@francisdadus.com"
                  className="hover:text-gold-400 transition-colors"
                >
                  hola@francisdadus.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-gold-400 flex-shrink-0" />
                <span>Santo Domingo, RD</span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">
                Asociación Cibao · Medios de Pagos y Alianzas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-800">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Francis Dadus. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/privacidad" className="hover:text-gold-400 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-gold-400 transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
