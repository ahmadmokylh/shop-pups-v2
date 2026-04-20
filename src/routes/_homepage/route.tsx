import Footer from '#/components/Footer'
import Navbar from '#/components/nav-bar'
import { meta } from '#/data/config-site'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_homepage')({
  head: () => ({
    meta: meta,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
