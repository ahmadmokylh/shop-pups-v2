import z from 'zod'

export const OTPSchema = z.object({
  paymentInfoId: z.number().int().positive(),
  otp: z
    .string({ message: 'OTP is required' })
    .trim()
    .length(6, 'OTP must be exactly 6 digits'),
})

export type OTPType = z.infer<typeof OTPSchema>
