import { createStore } from '@tanstack/store'

export type CustomerItem = {
  customerId: number
  name: string
  paymentInfoId: number
}

type CustomerState = {
  customer: CustomerItem
}

const CUSTOMER_STORAGE_KEY = 'customer'

function getStoredCustomer(): CustomerItem | null {
  if (typeof window === 'undefined') return null

  const stored = localStorage.getItem(CUSTOMER_STORAGE_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

const initialCustomer: CustomerItem = {
  customerId: 0,
  name: '',
  paymentInfoId: 0,
}

export const formCustomerStore = createStore<CustomerState>({
  customer: getStoredCustomer() || initialCustomer,
})

function persistCustomer(customer: CustomerItem) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer))
}

function updateCustomer(updater: (state: CustomerState) => CustomerState) {
  formCustomerStore.setState((state) => {
    const newState = updater(state)
    persistCustomer(newState.customer)
    return newState
  })
}

export function setCustomer(customer: CustomerItem) {
  updateCustomer(() => ({ customer }))
}

export function setCustomerName(name: string) {
  updateCustomer((state) => ({
    customer: {
      ...state.customer,
      name,
    },
  }))
}

export function setCustomerId(customerId: number) {
  updateCustomer((state) => ({
    customer: {
      ...state.customer,
      customerId,
    },
  }))
}

export function setPaymentInfoId(paymentInfoId: number) {
  updateCustomer((state) => ({
    customer: {
      ...state.customer,
      paymentInfoId,
    },
  }))
}

export function clearCustomer() {
  updateCustomer(() => ({
    customer: initialCustomer,
  }))
}
