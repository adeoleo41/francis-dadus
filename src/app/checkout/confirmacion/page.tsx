import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function ConfirmacionPage({
  searchParams,
}: {
  searchParams: { order?: string }
}) {
  return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={40} className="text-green-500" />
      </div>
      <h1 className="font-serif text-3xl font-bold text-charcoal-950 mb-3">
        ¡Pago Confirmado!
      </h1>
      <p className="text-gray-500 max-w-md mb-2">
        Tu compra ha sido procesada exitosamente. Revisa tu correo electrónico — en los
        próximos minutos recibirás los detalles y acceso a tus recursos.
      </p>
      {searchParams.order && (
        <p className="text-sm text-gray-400 mb-8">
          Número de orden: <span className="font-mono font-semibold text-charcoal-700">{searchParams.order}</span>
        </p>
      )}
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/" className="btn-gold">Ir al Inicio</Link>
        <Link href="/tienda" className="btn-outline-gold">Seguir Comprando</Link>
      </div>
    </div>
  )
}
