import { SmallProductCard } from '#/components/ui/small-product-card'
import { TopSection } from '#/components/ui/top-section'
import type { ProductSectionProps } from '#/types/product'

export default function OurProducts({ product }: ProductSectionProps) {
  return (
    <section>
      <TopSection>منتجاتنا</TopSection>

      <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(180px,1fr))] mt-6">
        {product.map((item, i) => (
          <SmallProductCard
            key={i}
            id={item.id}
            img={item.img}
            name={item.name}
            price={item.price}
            slug={item.slug}
            description={item.description}
          />
        ))}
      </div>
    </section>
  )
}
