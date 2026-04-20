import { env } from '#/env'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const customerNameSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
})

export const getCustomerByName = createServerFn({ method: 'GET' })
  .inputValidator(customerNameSchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams({
      name: data.name,
    })

    const url = `${env.VITE_GET_CUSTOMER_BY_NAME_URL}?${params.toString()}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const customer = await response.json()
    return customer
  })
