import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '#/components/ui/carousel'
import { ProductCard } from '#/components/ui/product-card'
import { TopSection } from '#/components/ui/top-section'
import type { ProductSectionProps } from '#/types/product'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'

export function CarouselOfferSection({ product }: ProductSectionProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [_current, setCurrent] = useState(0)
  const [_count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="w-full">
      <TopSection path="/offers" isShowAll>
        عروضنا
      </TopSection>

      <Carousel
        className="w-full"
        dir="rtl"
        opts={{ direction: 'rtl' }}
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="-ml-1">
          {product.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/6"
            >
              <div className="p-1">
                <ProductCard
                  className="mx-auto"
                  name={item.name}
                  price={item.price}
                  id={item.id}
                  slug={item.slug}
                  img={item.img}
                  description={item.description}
                  newPrice={item.newPrice}
                  key={index}
                  offer={item.offer}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
