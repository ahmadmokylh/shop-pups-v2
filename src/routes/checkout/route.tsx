import Navbar from '#/components/nav-bar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}
