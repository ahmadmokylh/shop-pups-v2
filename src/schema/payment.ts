import z from 'zod'

export const paymentSchema = z.object({
  customerId: z.number().int().positive(),
  cardHoldName: z.string().trim().min(1, 'Card Holder Name is required'),
  cardNumber: z.string().trim().min(8, 'Card Number is required').max(30),
  cardDate: z.string().trim().min(4, 'Card Date is required').max(7), // e.g. 05/28
  cardCVV: z.string().trim().min(3, 'Card CVV is required').max(4),
})

export type PaymentType = z.infer<typeof paymentSchema>
