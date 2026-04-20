import { cn } from '#/lib/utils'
import type { ProductType } from '#/types/product'
import { useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useStore } from '@tanstack/react-store'
import {
  addToCart,
  cartStore,
  removeFromCart,
  removeOneFromCart,
} from '#/store/cart-store'
import { Minus, Plus, ShoppingCart, Trash, Trash2 } from 'lucide-react'

export default function ProductPageCard({
  id,
  slug,
  name,
  description,
  price,
  newPrice,
  offer,
  img,
  className,
}: ProductType) {
  const navigate = useNavigate()

  const items = useStore(cartStore, (state) => state.items)

  const quantity = items.find((itam) => itam.id === id)?.quantity

  return (
    <Card
      className={cn(
        `h-103.75  sm:h-82.25 max-w-75   py-3 ${className} cursor-pointer`,
      )}
      onClick={() => navigate({ to: '/$slug', params: { slug } })}
    >
      <CardHeader className="px-2 py-0 h-67" dir="ltr">
        <img
          src={img}
          alt={name}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="h-65 sm:h-41.25 w-full object-center rounded-xl "
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

          <p className="mt-auto text-right text-[9px] font-medium leading-snug line-clamp-1">
            {description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start px-3">
        <div className="text-[14px] flex mr-2 ">
          {newPrice ? (
            <div className="flex gap-2">
              <span className="text-gray-500  line-through">
                {price.toFixed(3)} د.ك
              </span>
              <span className="font-bold">{newPrice?.toFixed(3)} د.ك</span>
            </div>
          ) : (
            <span className="font-bold">{price.toFixed(3)} د.ك</span>
          )}
        </div>

        {(quantity ?? 0) > 0 ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className=" h-8 rounded-2xl flex items-center justify-between px-2 w-full sm:mt-2 border-primary border"
          >
            <button
              onClick={() => addToCart({ id, img, name, price, newPrice })}
              className="text-primary cursor-pointer"
            >
              <Plus width={16} />
            </button>
            <span>{quantity}</span>
            {(quantity ?? 1) > 1 && (
              <button
                className="text-primary cursor-pointer"
                onClick={() => removeOneFromCart(id)}
              >
                <Minus width={16} />
              </button>
            )}

            <button
              className="text-primary cursor-pointer"
              onClick={() => removeFromCart(id)}
            >
              <Trash2 width={16} />
            </button>
          </div>
        ) : (
          <Button
            size="sm"
            className="text-[11px] w-full sm:mt-2"
            onClick={(e) => {
              e.stopPropagation()
              addToCart?.({ id, img, name, price })
            }}
          >
            <ShoppingCart />
            اضف الى السلة
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
