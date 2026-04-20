import * as z from 'zod'

export const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
})

export const orderSchema = z.object({
  customer: z.object({
    name: z.string().trim().min(1, 'الاسم لا يمكن أن يكون فارغ'),
    phone: z
      .string()
      .trim()
      .min(7, 'رقم الهاتف غير صالح')
      .max(15, 'رقم الهاتف غير صالح'),
    addressCountry: z.string().trim().min(1, 'البلد لا يمكن أن يكون فارغ'),
    addressCity: z.string().trim().min(1, 'المدينة لا يمكن أن تكون فارغة'),
    addressDetail: z
      .string()
      .trim()
      .min(1, 'تفاصيل العنوان لا يمكن أن تكون فارغة'),
  }),
  notes: z.string().trim().optional(),
  items: z.array(orderItemSchema).nonempty(),
})

export type OrderItemType = z.infer<typeof orderItemSchema>

export type OrderType = z.infer<typeof orderSchema>
