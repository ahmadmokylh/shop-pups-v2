import LayoutPage from '#/components/home-page/layout-page'

import { createFileRoute } from '@tanstack/react-router'
import { getAllProducts } from '#/server/get-all-products'
import ProductPageCard from '#/components/pages/product-page-card'

export const Route = createFileRoute('/_homepage/categories/')({
  loader: async () => {
    const product = await getAllProducts()

    return {
      product,
    }
  },

  component: RouteComponent,
})

function RouteComponent() {
  const { product } = Route.useLoaderData()

  return (
    <LayoutPage pageTitle="جميع التصنيفات">
      {product.map((item: any) => (
        <ProductPageCard
          key={item.id}
          id={item.id}
          img={item.img}
          name={item.name}
          price={item.price}
          slug={item.slug}
          description={item.description}
          newPrice={item.newPrice}
        />
      ))}
    </LayoutPage>
  )
}
