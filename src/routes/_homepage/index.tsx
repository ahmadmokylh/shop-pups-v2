import { Layout } from '#/components/home-page/layout'
import { CarouselOfferSection } from '#/components/home-page/sections/carousel-offer-section'
import { HeroSection } from '#/components/home-page/sections/hero-section'
import Sections from '#/components/home-page/sections/sections'
import { getProductsByCategory } from '#/server/get-products-by-category'
import { createFileRoute } from '@tanstack/react-router'
import BestSallesSection from '../../components/home-page/sections/best-salles-section'
import { getProductsById } from '#/server/get-products-by-id'
import OurProducts from '#/components/home-page/sections/our-products'
import OurOffersSection from '#/components/home-page/sections/our-offers-section'
import ImageSection from '#/components/home-page/sections/image-section'
import Testimonials from '#/components/home-page/sections/testimonials-section'
import { getAllProducts } from '#/server/get-all-products'
import { HomePagePending } from '#/components/home-page/home-page-pending'

export const Route = createFileRoute('/_homepage/')({
  pendingComponent: HomePagePending,
  pendingMs: 0,
  loader: async () => {
    const [carousel, bestSales, allProducts, ourOffer] = await Promise.all([
      getProductsByCategory({
        data: {
          category: 'OFFERS',
        },
      }),
      getProductsById({
        data: {
          ids: [72, 91, 75],
        },
      }),
      getAllProducts(),

      getProductsByCategory({
        data: {
          category: 'OFFERS',
          limit: 30,
        },
      }),
    ])

    return {
      product: carousel.data,
      productBestSales: bestSales.data,
      allProducts: allProducts,
      ourOffer: ourOffer.data,
    }
  },

  component: RouteComponent,
})

function RouteComponent() {
  const { product, productBestSales, allProducts, ourOffer } =
    Route.useLoaderData()

  return (
    <main>
      <HeroSection />
      <Layout>
        <CarouselOfferSection product={product} />
        <Sections />
        <BestSallesSection product={productBestSales} />
        <OurProducts product={allProducts} />
        <OurOffersSection product={ourOffer} />
      </Layout>
      <ImageSection />
      <Testimonials />
    </main>
  )
}
