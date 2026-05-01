import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
})

export async function createPaymentIntent(
  amount: number,
  currency: string = 'dop',
  metadata: Record<string, string> = {}
) {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // in centavos
    currency,
    automatic_payment_methods: { enabled: true },
    metadata,
  })
}
