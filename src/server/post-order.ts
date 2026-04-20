import { env } from '#/env'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
})

const customerSchema = z.object({
  name: z.string().trim().min(1).optional(),
  phone: z.string().trim().min(3).optional(),
  addressCountry: z.string().trim().optional(),
  addressCity: z.string().trim().optional(),
  addressDetail: z.string().trim().optional(),
})

const payloadSchema = z.object({
  customer: customerSchema,
  notes: z.string().trim().optional(),
  items: z.array(orderItemSchema).nonempty(),
})

export const postOrder = createServerFn({ method: 'POST' })
  .inputValidator(payloadSchema)
  .handler(async ({ data }) => {
    const url = `${env.VITE_POST_ORDERS_URL}`

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
