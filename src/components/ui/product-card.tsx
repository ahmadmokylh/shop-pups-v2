import type { ProductType } from '#/types/product'
import { ShoppingCart } from 'lucide-react'
import { Badge } from './badge'
import { Button } from './button'
import { Card, CardContent, CardFooter, CardHeader } from './card'
import { cn } from '#/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import { addToCart } from '#/store/cart-store'

export function ProductCard({
  id,
  slug,
  name,
  price,
  newPrice,
  description,
  offer,
  img,
  className,
}: ProductType) {
  const navigate = useNavigate()

  const handleAddToCart = () => {
    addToCart({ id, name, price, img, newPrice })
  }

  return (
    <Card
      className={cn(`h-103.75 max-w-75 ${className} cursor-pointer`)}
      onClick={() => navigate({ to: '/$slug', params: { slug } })}
    >
      <CardHeader className="px-4 py-0 h-67" dir="ltr">
        <img
          src={img}
          alt={name}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-65 w-full object-center rounded-xl "
        />

        <Badge className=" absolute top-10" dir="rtl">
          {offer?.replace('off', '-').replace('$', ' د.ك ')}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <p className="text-right text-[13px] font-bold leading-snug line-clamp-1">
            {name}
          </p>

          <p className="mt-auto text-right text-[11px] font-medium leading-snug line-clamp-1">
            {description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between px-4">
        <div className="text-[14px] flex gap-1">
          {newPrice ? (
            <>
              <span className="text-gray-500  line-through">
                {price.toFixed(3)} د.ك
              </span>
              <span className="font-bold">{newPrice?.toFixed(3)} د.ك</span>
            </>
          ) : (
            <span className="font-bold">{price.toFixed(3)} د.ك</span>
          )}
        </div>
        <Button
          size="sm"
          className="text-[11px] px-3"
          onClick={(e) => {
            e.stopPropagation()
            handleAddToCart()
          }}
        >
          <ShoppingCart />
          اضف الى السلة
        </Button>
      </CardFooter>
    </Card>
  )
}
