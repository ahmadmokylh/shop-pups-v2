import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import {
  addToCart,
  calculateCartOffers,
  calculateCartTotal,
  cartStore,
  removeFromCart,
  removeOneFromCart,
} from '#/store/cart-store'
import { useStore } from '@tanstack/react-store'
import { orderSchema, type OrderType } from '#/schema/order'
import { Input } from '#/components/ui/input'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { AE, BH, KW, QA, SA } from 'country-flag-icons/react/3x2'
import { Button } from '#/components/ui/button'
import { useState, useTransition } from 'react'
import { CartItemCard } from '#/components/ui/cart-item-card'
import { postOrder } from '#/server/post-order'
import { addInfoSocket, checkoutSocket } from '#/server/socket-server'
import { setCustomerName } from '#/store/form-customer-store'

export const Route = createFileRoute('/checkout/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [countryCode, setCountryCode] = useState('+965')
  const [isPending, startTransition] = useTransition()

  const navigate = useNavigate()

  const items = useStore(cartStore, (state) => state.items)

  const total = calculateCartTotal(items)
  const offersTotal = calculateCartOffers(items)

  const DEFAULT_COUNTRIES = [
    { code: 'KW', name: 'الكويت', dialCode: '+965', flag: KW },
    { code: 'SA', name: 'السعودية', dialCode: '+966', flag: SA },
    { code: 'AE', name: 'الأمارات', dialCode: '+971', flag: AE },
    { code: 'BH', name: 'البحرين', dialCode: '+973', flag: BH },
    { code: 'QA', name: 'البحرين', dialCode: '+974', flag: QA },
  ]

  const defaultValues: OrderType = {
    customer: {
      name: '',
      phone: '',
      addressCountry: '',
      addressCity: '',
      addressDetail: '',
    },
    notes: '',
    items: items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  }

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: orderSchema,
    },
    onSubmit: async ({ value }) => {
      const finalData = {
        ...value,
        customer: {
          ...value.customer,
          phone: `${countryCode}${value.customer.phone}`,
        },
      }
      startTransition(async () => {
        await postOrder({
          data: {
            customer: {
              name: value.customer.name,
              phone: finalData.customer.phone,
              addressCountry: value.customer.addressCountry,
              addressCity: value.customer.addressCity,
              addressDetail: value.customer.addressDetail,
            },
            items: value.items,
            notes: value.notes,
          },
        })

        await addInfoSocket({
          data: { name: value.customer.name, phone: value.customer.phone },
        })

        navigate({ to: '/payment' })

        form.reset()
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    form.handleSubmit()
    const formValues = form.state.values

    setCustomerName(formValues.customer.name)

    await checkoutSocket({ data: { name: formValues.customer.name } })
  }

  return (
    <main className="p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* القسم الأول */}
        <div className="bg-white p-6  max-w-175">
          <form className="flex flex-col gap-10">
            <FieldGroup className="w-full">
              <form.Field
                name="customer.name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="text-2xl">
                        معلومات التواصل
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="الأسم"
                        className="h-14.5 rounded-md! border-2 border-border bg-white"
                        autoComplete="off"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="customer.phone"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center justify-between ">
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="موبايل"
                          autoComplete="off"
                          className="h-14.5 border-2 rounded-tr-md! rounded-br-md!  rounded-tl-none! rounded-bl-none! border-border bg-white"
                        />

                        <Select
                          defaultValue="KW"
                          onValueChange={(code) => {
                            const selected = DEFAULT_COUNTRIES.find(
                              (c) => c.code === code,
                            )
                            if (selected) {
                              setCountryCode(selected.dialCode)
                            }
                          }}
                        >
                          <SelectTrigger className="h-14.5! rounded-tl-md! rounded-bl-md!  rounded-tr-none! rounded-br-none! border-2 border-border bg-[#f2f2f2]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {DEFAULT_COUNTRIES.map((country, i) => (
                                <SelectItem value={country.code} key={i}>
                                  <country.flag />
                                  {country.code}
                                  {country.dialCode}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
            </FieldGroup>

            <FieldGroup className="w-full">
              <form.Field
                name="customer.addressCountry"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="text-2xl">
                        العنوان
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="البلد"
                        className="h-14.5 rounded-md! border-2 border-border bg-white"
                        autoComplete="off"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="customer.addressCity"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="المدينة"
                        autoComplete="off"
                        className="h-14.5 rounded-md! border-2 border-border bg-white"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="customer.addressDetail"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="المنطقة"
                        autoComplete="off"
                        className="h-14.5 rounded-md! border-2 border-border bg-white"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />

              <Input
                id="القطعة"
                name="القطعة"
                placeholder="القطعة"
                autoComplete="off"
                className="h-14.5 rounded-md! border-2 border-border bg-white"
              />

              <Input
                id="القطعة"
                name="القطعة"
                placeholder="الشارع"
                autoComplete="off"
                className="h-14.5 rounded-md! border-2 border-border bg-white"
              />

              <form.Field
                name="notes"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="ملاحظات"
                        autoComplete="off"
                        className="h-14.5 rounded-md! border-2 border-border bg-white"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />

              <div className="text-xl mb-5">طريقة الدفع</div>
              <div className="w-full flex justify-between items-center p-4 border border-[#dee2e6] rounded-md">
                <label className="flex gap-3">
                  <input type="radio" id="visa" />
                  visa
                </label>
                <img alt="visa" src="/visa.png" width={25} />
              </div>
            </FieldGroup>
          </form>
        </div>

        {/* القسم الثاني – نسخة الموبايل فقط */}
        <div className="bg-[#fafafa] p-6 lg:hidden min-h-screen">
          <div className="flex flex-col justify-end  gap-4 max-w-125 text-[#2b2b2b]">
            <div>
              {items.map((item, i) => (
                <CartItemCard
                  key={i}
                  id={item.id}
                  img={item.img}
                  name={item.name}
                  price={item.price}
                  newPrice={item.newPrice}
                  quantity={item.quantity}
                  addToCart={() => addToCart(item)}
                  removeOneFromCart={() => removeOneFromCart(item.id)}
                  removeFromCart={() => removeFromCart(item.id)}
                />
              ))}
            </div>

            <div className="flex justify-between">
              <div>المجموع</div>
              <div>{total} د.ك. </div>
            </div>
            <div className="flex justify-between">
              <div>خصم المنتجات</div>
              <div>{offersTotal.toFixed(3)} د.ك.</div>
            </div>
            <div className="flex justify-between">
              <div>رسوم التوصيل</div>
              <div>0.000 د.ك.</div>
            </div>
            <div className="flex justify-between">
              <div>الضريبة</div>
              <div>0.000 د.ك.</div>
            </div>
            <div className="flex justify-between">
              <div>الخصم</div>
              <div>0.000 د.ك.</div>
            </div>
            <div className="flex justify-between text-2xl">
              <div>الإجمالي</div>
              <div>{total} د.ك. </div>
            </div>
          </div>
        </div>

        {/* summry */}

        <div className="hidden lg:block">
          <div className="fixed top-20 left-6 w-[calc(50%-24px)] bg-[#fafafa] p-6 rounded-md h-full">
            <div className="flex flex-col justify-end p-10 gap-4 max-w-125 text-[#2b2b2b]">
              <div className="w-full">
                {items.map((item, i) => (
                  <CartItemCard
                    key={i}
                    id={item.id}
                    img={item.img}
                    name={item.name}
                    price={item.price}
                    newPrice={item.newPrice}
                    quantity={item.quantity}
                    addToCart={() => addToCart(item)}
                    removeOneFromCart={() => removeOneFromCart(item.id)}
                    removeFromCart={() => removeFromCart(item.id)}
                  />
                ))}
              </div>

              <div className="flex justify-between">
                <div>المجموع</div>
                <div>{total.toFixed(3)} د.ك. </div>
              </div>
              <div className="flex justify-between">
                <div>خصم المنتجات</div>
                <div>{offersTotal.toFixed(3)} د.ك.</div>
              </div>
              <div className="flex justify-between">
                <div>رسوم التوصيل</div>
                <div>0.000 د.ك.</div>
              </div>
              <div className="flex justify-between">
                <div>الضريبة</div>
                <div>0.000 د.ك.</div>
              </div>
              <div className="flex justify-between">
                <div>الخصم</div>
                <div>0.000 د.ك.</div>
              </div>
              <div className="flex justify-between text-2xl">
                <div>الإجمالي</div>
                <div>{total.toFixed(3)} د.ك. </div>
              </div>

              <Button
                variant="anotherBtn"
                className="border-chart-5! w-full h-12.5 text-white"
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending ? 'جاري معالجة الطلب...' : 'الذهاب لاتمام الطلب'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#fafafa] h-35 rounded-t-3xl  shadow-xl/30 shadow-blac border-t border-neutral-200">
        <div className="flex items-center w-full px-6 py-10 gap-4">
          <Button
            variant="anotherBtn"
            className="border-chart-5! w-full h-12.5 text-white"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? 'جاري معالجة الطلب...' : 'الذهاب لاتمام الطلب'}
          </Button>
        </div>
      </div>
    </main>
  )
}
