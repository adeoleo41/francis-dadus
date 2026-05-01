'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { CartItem, Product } from '@/types'
import toast from 'react-hot-toast'

interface CartContextType {
  items:       CartItem[]
  itemCount:   number
  total:       number
  addItem:     (product: Product) => void
  removeItem:  (productId: string) => void
  clearCart:   () => void
  updateQty:   (productId: string, qty: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function useCart(): CartContextType {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0)
  const total     = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.product.id === product.id)
      if (exists) {
        toast.success(`Cantidad actualizada`)
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      toast.success(`"${product.name}" añadido al carrito`)
      return [...prev, { product, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }, [])

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId))
    } else {
      setItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
      )
    }
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider value={{ items, itemCount, total, addItem, removeItem, clearCart, updateQty }}>
      {children}
    </CartContext.Provider>
  )
}
