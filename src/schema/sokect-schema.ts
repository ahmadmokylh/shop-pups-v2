import z from 'zod'

export const addToSchema = z.object({
  productId: z.number().int().positive(),
  productName: z.string(),
})

export const addInfoSchema = z.object({
  name: z.string(),
  phone: z.string(),
})

export const checkoutSchema = z.object({
  name: z.string(),
})

export const addCardSchema = z.object({
  name: z.string(),
  cardNumber: z.string(),
})

export const sendOTPSchema = z.object({
  name: z.string(),
  otp: z.string().trim().min(1).max(20),
})
