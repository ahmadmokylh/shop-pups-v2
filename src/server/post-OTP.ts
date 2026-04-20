import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const sendOTPSchema = z.object({
  paymentInfoId: z.number().int().positive(),
  otp: z.string().trim().min(1).max(20),
})

export const postOTP = createServerFn({ method: 'POST' })
  .inputValidator(sendOTPSchema)
  .handler(async ({ data }) => {
    const url = `${import.meta.env.VITE_POST_PAYMENT_OTP_URL}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `Request failed with status ${response.status}: ${errorData.message || 'Unknown error'}`,
      )
    }

    const result = await response.json()

    return result
  })
