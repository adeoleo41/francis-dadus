/**
 * Azul Payment Gateway Integration
 * Dominican Republic local payment processor
 * Docs: https://developers.azul.com.do
 *
 * Supports: VISA, Mastercard, AMEX emitidas en RD
 */

const AZUL_BASE_URL =
  process.env.AZUL_ENVIRONMENT === 'prod'
    ? 'https://pagos.azul.com.do/PaymentPage/api/default.aspx'
    : 'https://pruebas.azul.com.do/PaymentPage/api/default.aspx'

export interface AzulSaleRequest {
  amount: number        // in pesos (RD$1,500.00)
  itbis: number         // ITBIS tax 18%
  orderId: string
  customerName: string
  customerEmail: string
  cardNumber: string
  cardExpiry: string    // MMYY format
  cardCVV: string
  description: string
}

export interface AzulResponse {
  IsoCode: string
  ResponseMessage: string
  AuthorizationCode: string
  AzulOrderId: string
  DateTime: string
  TicketNumber: string
  RRN: string
}

export async function processAzulPayment(data: AzulSaleRequest): Promise<AzulResponse> {
  const merchantId = process.env.AZUL_MERCHANT_ID!
  const auth1      = process.env.AZUL_AUTH1!
  const auth2      = process.env.AZUL_AUTH2!

  // Amount in centavos (without decimal point)
  const amountStr = Math.round(data.amount * 100).toString().padStart(12, '0')
  const itbisStr  = Math.round(data.itbis * 100).toString().padStart(12, '0')

  const payload = {
    Channel:             process.env.AZUL_CHANNEL ?? 'EC',
    Store:               process.env.AZUL_STORE ?? merchantId,
    CardNumber:          data.cardNumber.replace(/\s/g, ''),
    Expiration:          data.cardExpiry.replace('/', ''),
    CVC:                 data.cardCVV,
    PosInputMode:        'E-Commerce',
    TrxType:             'Sale',
    Amount:              amountStr,
    Itbis:               itbisStr,
    CurrencyPosCode:     '$',
    OrderNumber:         data.orderId,
    ECommerceURL:        process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    CustomerServicePhone: '8091234567',
    AltMerchantName:     'Francis Dadus',
    SaveToDataVault:     '0',
    DataVaultToken:      '',
    ForceNo3DS:          '0',
  }

  const response = await fetch(AZUL_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Auth1:          auth1,
      Auth2:          auth2,
      MerchantId:     merchantId,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Azul gateway error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<AzulResponse>
}

export function isAzulApproved(response: AzulResponse): boolean {
  return response.IsoCode === '00'
}

export function calculateITBIS(amount: number): number {
  return parseFloat((amount * 0.18).toFixed(2))
}
