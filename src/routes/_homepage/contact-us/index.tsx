import FormContactPage from '#/components/contact-us/form-contact-us'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_homepage/contact-us/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FormContactPage />
}
