import { addToCartSocket } from '#/server/socket-server'
import { createStore } from '@tanstack/react-store'

export type CartItem = {
  id: number
  name: string
  img: string
  price: number
  newPrice?: number
  offer?: string
  quantity: number
}

type CartState = {
  items: CartItem[]
}

const CART_STORAGE_KEY = 'cart-items'

function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return []

  const stored = localStorage.getItem(CART_STORAGE_KEY)

  if (!stored) return []

  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export const cartStore = createStore<CartState>({
  items: [],
})

let hasHydratedCart = false

function persistCart(items: CartItem[]) {
  if (typeof window === 'undefined') return

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

function updateCart(updater: (state: CartState) => CartState) {
  cartStore.setState((state) => {
    const newState = updater(state)

    persistCart(newState.items)

    return newState
  })
}

function getItemUnitPrice(item: CartItem) {
  return item.newPrice ?? item.price
}

export function calculateCartTotal(items: CartItem[]) {
  return items.reduce(
    (total, item) => total + getItemUnitPrice(item) * item.quantity,
    0,
  )
}

export function calculateCartOffers(items: CartItem[]) {
  return items.reduce((total, item) => {
    if (item.newPrice === undefined) {
      return total
    }

    const offerAmount = (item.price - item.newPrice) * item.quantity
    return total + Math.max(offerAmount, 0)
  }, 0)
}

export function getCartCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0)
}

export function isInCart(productId: number) {
  return cartStore.state.items.some((item) => item.id === productId)
}

export async function addToCart(product: Omit<CartItem, 'quantity'>) {
  updateCart((state) => {
    const existingItem = state.items.find((item) => item.id === product.id)

    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      }
    }

    return {
      ...state,
      items: [
        ...state.items,
        {
          ...product,
          quantity: 1,
        },
      ],
    }
  })

  await addToCartSocket({
    data: { productId: product.id, productName: product.name },
  })
}

export function removeOneFromCart(productId: number) {
  updateCart((state) => {
    const existingItem = state.items.find((item) => item.id === productId)

    if (!existingItem) return state

    if (existingItem.quantity === 1) {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== productId),
      }
    }

    return {
      ...state,
      items: state.items.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      ),
    }
  })
}

export function removeFromCart(productId: number) {
  updateCart((state) => ({
    ...state,
    items: state.items.filter((item) => item.id !== productId),
  }))
}

export function clearCart() {
  updateCart((state) => ({
    ...state,
    items: [],
  }))
}

export function hydrateCartFromStorage() {
  if (typeof window === 'undefined' || hasHydratedCart) return

  hasHydratedCart = true

  cartStore.setState((state) => ({
    ...state,
    items: getStoredCart(),
  }))
}
