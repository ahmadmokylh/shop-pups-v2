import FormOTP from '#/components/send-otp/form-otp'
import {
  calculateCartTotal,
  cartStore,
  hydrateCartFromStorage,
} from '#/store/cart-store'
import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { useEffect } from 'react'

export const Route = createFileRoute('/send-otp/')({
  component: RouteComponent,
})

function RouteComponent() {
  const items = useStore(cartStore, (state) => state.items)

  const total = calculateCartTotal(items)

  useEffect(() => {
    hydrateCartFromStorage()
  }, [])

  return (
    <div className="w-full max-w-md bg-white border border-gray-400 rounded-sm shadow-lg px-6 pb-20 pt-10">
      <FormOTP total={total} />
    </div>
  )
}
