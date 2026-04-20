import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { env } from '#/env'

const categorySchema = z.object({
  category: z.string(),
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
})

export const getProductsByCategory = createServerFn({
  method: 'GET',
})
  .inputValidator(categorySchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams({
      category: data.category,
      page: String(data.page ?? 1),
      limit: String(data.limit ?? 10),
    })

    const url = `${env.VITE_GET_PRODUCTS_BY_CATEGORY_URL}?${params.toString()}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const result = await response.json()

    return result
  })
