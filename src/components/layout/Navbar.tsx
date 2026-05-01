'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/components/store/CartProvider'

const navLinks = [
  { href: '#inicio',    label: 'Inicio' },
  { href: '#sobre-mi',  label: 'Sobre Mí' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#recursos',  label: 'Recursos' },
  { href: '#contacto',  label: 'Contacto' },
]

export default function Navbar() {
  const [isOpen,     setIsOpen]     = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const { itemCount }               = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://ik.imagekit.io/202507/FD/LogoTipo.jpeg"
              alt="Francis Dadus Logo"
              width={48}
              height={48}
              className="rounded-full object-cover"
              unoptimized
            />
            <Image
              src="https://ik.imagekit.io/202507/FD/Logo%20Nombre.jpeg"
              alt="Francis Dadus"
              width={140}
              height={40}
              className="object-contain hidden sm:block"
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link pb-1">
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/tienda"
              className="relative text-charcoal-800 hover:text-gold-500 transition-colors"
              aria-label="Tienda"
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/tienda"
              className="hidden sm:inline-flex btn-gold text-sm py-2.5 px-5"
            >
              Tienda
            </Link>

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-charcoal-800"
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="section-container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 px-2 text-charcoal-800 hover:text-gold-500 font-medium border-b border-gray-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/tienda"
              onClick={() => setIsOpen(false)}
              className="btn-gold mt-3 text-center"
            >
              Ver Tienda
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
