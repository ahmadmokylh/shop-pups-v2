'use client'

import { useState } from 'react'

interface FormState {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export default function FormContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = 'الاسم مطلوب'
    if (!form.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب'
    if (!form.phone.trim()) newErrors.phone = 'رقم التواصل مطلوب'
    if (!form.subject.trim()) newErrors.subject = 'الموضوع مطلوب'
    if (!form.message.trim()) newErrors.message = 'الرسالة مطلوبة'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = () => {
    if (!validate()) return
    // TODO: wire to your API endpoint
    setSubmitted(true)
  }

  const inputBase =
    'w-full h-11 px-3.5 text-sm text-right bg-white border rounded-lg outline-none transition-all duration-150 font-[inherit] placeholder:text-gray-300 focus:ring-2 focus:ring-amber-900/10'

  const inputClass = (field: keyof FormErrors) =>
    `${inputBase} ${
      errors[field]
        ? 'border-red-400 focus:border-red-400'
        : 'border-gray-200 focus:border-[#6B4A1E]'
    }`

  return (
    <div className="min-h-screen bg-white px-6 py-12 font-[IBM_Plex_Sans_Arabic,sans-serif]">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_260px] gap-16 items-start">
        {/* Form Column */}
        <div>
          <h1 className="text-lg font-semibold text-gray-900 mb-8 pb-4 border-b border-gray-100 tracking-tight">
            مراسلة فريق الدعم الفني
          </h1>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-amber-900/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-5 h-5 text-[#6B4A1E]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-base font-semibold text-gray-900 mb-1">
                تم إرسال رسالتك بنجاح
              </p>
              <p className="text-sm text-gray-500">
                سيتواصل معك فريق الدعم في أقرب وقت ممكن.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <Field label="الاسم" error={errors.name}>
                <input
                  className={inputClass('name')}
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                />
              </Field>

              <Field label="البريد الإلكتروني" error={errors.email}>
                <input
                  className={inputClass('email')}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </Field>

              <Field label="رقم التواصل" error={errors.phone}>
                <div className="flex gap-2 flex-row-reverse">
                  <input
                    className={`${inputClass('phone')} flex-1`}
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="يجب اضافة رمز الدول"
                  />
                </div>
              </Field>

              <Field label="الموضوع" error={errors.subject}>
                <input
                  className={inputClass('subject')}
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                />
              </Field>

              <Field label="الرسالة" error={errors.message}>
                <textarea
                  className={`${inputClass('message')} !h-36 py-3 resize-none leading-relaxed`}
                  name="message"
                  placeholder="اكتب رسالتك هنا."
                  value={form.message}
                  onChange={handleChange}
                />
              </Field>

              <button
                onClick={handleSubmit}
                className="w-full h-12 bg-[#6B4A1E] hover:bg-[#5a3d17] active:scale-[0.99] text-white text-[15px] font-medium rounded-lg transition-all duration-150 mt-1"
              >
                إرسال
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8 pt-1">
          <div>
            <h2 className="text-[15px] font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
              شبكات التواصل الاجتماعي
            </h2>
            <div className="flex justify-end gap-3">
              <SocialIcon
                label="WhatsApp"
                href="https://api.whatsapp.com/send?phone=96597388320&utm_campaign=wa_phone_number_xma_not_in_test&source_surface=49"
              >
                <img src="./whatsapp.png" className="w-7 h-7" />
              </SocialIcon>

              <SocialIcon
                label="TikTok"
                href="https://tiktok.com/honeyaithnayan"
              >
                <img src="./tiktok.png" className="w-7 h-7" />
              </SocialIcon>

              <SocialIcon
                label="Instagram"
                href="https://instagram.com/honeyaithnayan"
              >
                <img src="./instagram.png" className="w-7 h-7" />
              </SocialIcon>
            </div>
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-gray-900 mb-3 pb-3 border-b border-gray-100">
              عنوان الشركة
            </h2>
            <div className="flex items-start gap-2 pt-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
              >
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-gray-500 mb-1.5">
        <span className="text-red-500 ml-0.5">*</span>
        {label}
      </label>
      {children}
      {error && <p className="text-[12px] text-red-500 mt-1">{error}</p>}
    </div>
  )
}

function SocialIcon({
  label,
  children,
  href,
}: {
  label: string
  children: React.ReactNode
  href: string
}) {
  return (
    <a
      href={href}
      title={label}
      target="_blank"
      className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 cursor-pointer"
    >
      {children}
    </a>
  )
}
