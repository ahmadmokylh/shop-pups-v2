import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/send-otp')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main
      className="min-h-screen bg-[#dcdcdc] flex items-center justify-center p-6"
      dir="ltr"
    >
      <Outlet />
    </main>
  )
}
