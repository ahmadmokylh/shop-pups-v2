import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/payment')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main
      dir="ltr"
      className="w-full flex h-screen justify-center items-center bg-[url('/Pattern.svg')] bg-no-repeat bg-cover bg-center"
    >
      <Outlet />
    </main>
  )
}
