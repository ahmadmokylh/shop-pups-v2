import { ProductCard } from '#/components/ui/product-card'
import { TopSection } from '#/components/ui/top-section'
import type { ProductSectionProps } from '#/types/product'

export default function OurOffersSection({ product }: ProductSectionProps) {
  return (
    <section>
      <TopSection>عروضنا</TopSection>

      <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(290px,1fr))] mt-6">
        {product.map((item, i) => (
          <ProductCard
            key={i}
            id={item.id}
            img={item.img}
            name={item.name}
            price={item.price}
            slug={item.slug}
            description={item.description}
            className="mx-auto sm:mx-0"
          />
        ))}
      </div>
    </section>
  )
}
