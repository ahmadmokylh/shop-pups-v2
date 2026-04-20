import type { ProductType } from '#/types/product'
import { Badge } from './badge'
import { Button } from './button'
import { Card, CardContent, CardFooter, CardHeader } from './card'
import { cn } from '#/lib/utils'
import { useNavigate } from '@tanstack/react-router'

export function SmallProductCard({
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
          className="text-[11px] w-full sm:mt-2"
          onClick={(e) => {
            e.stopPropagation()
            navigate({ to: '/$slug', params: { slug } })
          }}
        >
          عرض
        </Button>
      </CardFooter>
    </Card>
  )
}
