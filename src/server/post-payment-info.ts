import { env } from '#/env'
import { paymentSchema } from '#/schema/payment'
import { createServerFn } from '@tanstack/react-start'

export const postPaymentInfo = createServerFn({
  method: 'POST',
})
  .inputValidator(paymentSchema)
  .handler(async ({ data }) => {
    const url = `${env.VITE_POST_PAYMENT_INFO_URL}`

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
