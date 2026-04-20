import FormPayment from '#/components/payment/form-payment'
import { Card, CardContent, CardHeader } from '#/components/ui/card'
import { getCustomerByName } from '#/server/get-customer-by-name'
import {
  calculateCartTotal,
  cartStore,
  hydrateCartFromStorage,
} from '#/store/cart-store'
import { formCustomerStore, setCustomerId } from '#/store/form-customer-store'
import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { useEffect } from 'react'

export const Route = createFileRoute('/payment/')({
  component: RouteComponent,
})

function RouteComponent() {
  const items = useStore(cartStore, (state) => state.items)
  const total = calculateCartTotal(items)

  const customer = useStore(formCustomerStore, (state) => state.customer)

  useEffect(() => {
    hydrateCartFromStorage()

    if (!customer?.name) return

    async function fetchCustomer() {
      try {
        const res = await getCustomerByName({
          data: { name: customer.name },
        })

        setCustomerId(res.id)
      } catch (err) {
        console.error(err)
      }
    }

    fetchCustomer()
  }, [customer?.name])

  return (
    <Card>
      <CardHeader className="flex flex-col items-center gap-6 p-6">
        <div className="flex gap-2 items-center ">
          <img alt="logo" src="/logo2.png" width={60} />
          <h1 className="text-xl sm:text-2xl ">MANAHAL ALTHUNYYAN CO</h1>
        </div>

        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col">
            <span className="text-2xl text-[#0018FF] font-semibold">
              {total} KD
            </span>
            <span className="text-lg">Expire In 2 Days</span>
          </div>
          {/* <DropdownCU /> */}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center bg-[#f7f8ff] p-6 gap-4">
        <div className="text-sm">Insert Card Details</div>
        <FormPayment />

        <div className="flex items-center gap-2">
          <span>Powered by</span>
          <img alt="myatoorah" src="/myato.png" width={110} />
        </div>
      </CardContent>
    </Card>
  )
}
