import { env } from '#/env'
import { createServerFn } from '@tanstack/react-start'

export const getAllProducts = createServerFn({ method: 'GET' }).handler(
  async () => {
    const url = `${env.VITE_GET_PRODUCTS_URL}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const result = await response.json()

    return result
  },
)
