import { env } from '#/env'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const idsSchema = z.object({
  ids: z.array(z.number()),
})

export const getProductsById = createServerFn({
  method: 'GET',
})
  .inputValidator(idsSchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams({
      ids: data.ids.join(','),
    })

    const url = `${env.VITE_GET_PRODUCTS_BY_ID_URL}?${params.toString()}`

    const res = await fetch(url)

    return res.json()
  })
