import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'
import CartProvider from '@/components/store/CartProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Francis Dadus | Liderazgo · Ventas · Comunicación',
    template: '%s | Francis Dadus',
  },
  description:
    'Francis Dadus — Consultora de Liderazgo, Ventas y Comunicación. Coaching, mentoría, cursos y talleres para profesionales y empresas en República Dominicana.',
  keywords: [
    'Francis Dadus', 'liderazgo', 'ventas', 'comunicación',
    'coaching', 'mentoría', 'cursos', 'talleres',
    'República Dominicana', 'Santo Domingo',
  ],
  authors: [{ name: 'Francis Dadus' }],
  openGraph: {
    type:        'website',
    locale:      'es_DO',
    url:         process.env.NEXT_PUBLIC_SITE_URL,
    siteName:    'Francis Dadus',
    title:       'Francis Dadus | Liderazgo · Ventas · Comunicación',
    description: 'Consultora · Coach · Conferencista en República Dominicana',
    images: [
      {
        url:   'https://ik.imagekit.io/202507/FD/FrancisDadus.jpeg',
        width:  1200,
        height: 630,
        alt:   'Francis Dadus',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Francis Dadus | Liderazgo · Ventas · Comunicación',
    description: 'Consultora · Coach · Conferencista en República Dominicana',
  },
  robots: {
    index:  true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1A1A1A',
              color: '#fff',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  )
}
