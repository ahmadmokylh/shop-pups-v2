import LayoutPage from '#/components/home-page/layout-page'
import ProductPageCard from '#/components/pages/product-page-card'
import { getProductsByCategory } from '#/server/get-products-by-category'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_homepage/hive-products/')({
  loader: async () => {
    const ourOffer = await getProductsByCategory({
      data: { category: 'HIVE_PRODUCTS', limit: 50 },
    })

    return {
      product: ourOffer.data,
    }
  },

  component: RouteComponent,
})

function RouteComponent() {
  const { product } = Route.useLoaderData()

  return (
    <LayoutPage pageTitle="العسل العضوي">
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
