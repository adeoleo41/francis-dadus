export type ProductType =
  | 'BOOK_DIGITAL'
  | 'BOOK_PHYSICAL'
  | 'COURSE_ONLINE'
  | 'COURSE_LIVE'
  | 'WORKSHOP'
  | 'COACHING'
  | 'BUNDLE'

export interface Product {
  id:          string
  slug:        string
  name:        string
  description: string
  price:       number
  currency:    string
  type:        ProductType
  imageUrl:    string | null
  isActive:    boolean
  isFeatured:  boolean
}

export interface CartItem {
  product:  Product
  quantity: number
}

export interface CheckoutFormData {
  name:          string
  email:         string
  phone:         string
  paymentMethod: 'azul' | 'stripe'
  // Azul card fields
  cardNumber?:   string
  cardExpiry?:   string
  cardCVV?:      string
  cardName?:     string
}

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  BOOK_DIGITAL:   'Libro Digital',
  BOOK_PHYSICAL:  'Libro Físico',
  COURSE_ONLINE:  'Curso Online',
  COURSE_LIVE:    'Curso en Vivo (Zoom)',
  WORKSHOP:       'Taller',
  COACHING:       'Sesión de Coaching',
  BUNDLE:         'Paquete',
}

export function formatDOP(amount: number): string {
  return new Intl.NumberFormat('es-DO', {
    style:    'currency',
    currency: 'DOP',
    minimumFractionDigits: 0,
  }).format(amount)
}
