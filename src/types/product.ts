export type ProductType = {
  id: number
  name: string
  slug: string
  description?: string
  img: string
  offer?: string
  category?: string
  price: number
  newPrice?: number
  className?: string
}

export type ProductSectionProps = {
  product: ProductType[]
}
