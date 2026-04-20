import { Minus, Plus, Trash } from 'lucide-react'
import type { CartItem } from '#/store/cart-store'
import { cn } from '#/lib/utils'

type CardItemCardProps = {
  className?: string
  id: number
  name: string
  img: string
  price: number
  newPrice?: number
  quantity: number
  removeFromCart?: (id: number) => void
  removeOneFromCart?: (id: number) => void
  addToCart?: (product: Omit<CartItem, 'quantity'>) => void
}

export function CartItemCard({
  className,
  id,
  name,
  price,
  newPrice,
  img,
  quantity,
  removeFromCart,
  removeOneFromCart,
  addToCart,
}: CardItemCardProps) {
  return (
    <div
      className={cn(
        `${className} w-full border text-black border-gray-200 rounded-2xl p-2 flex flex-wrap items-start gap-2 justify-between my-4`,
      )}
    >
      <img src={img} alt={name} width="100" className=" rounded-2xl" />

      <div className="flex-1 flex flex-col gap-3">
        <span>{name}</span>

        {newPrice ? (
          <>
            <span className="text-[#5a3519] text-sm">
              {newPrice.toFixed(3)} د.ك.
            </span>
            <span className="text-[#acacac] text-sm line-through">
              {price.toFixed(3)} د.ك.
            </span>
          </>
        ) : (
          <span className="text-[#5a3519] text-sm">
            {price.toFixed(3)} د.ك.
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 bg-[#f2f2f2] h-10 w-35 rounded-xl px-3 self-end">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => removeFromCart?.(id)}
        >
          <Trash width={15} />
        </button>

        {quantity > 1 && (
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => removeOneFromCart?.(id)}
          >
            <Minus width={15} />
          </button>
        )}

        <span>{quantity}</span>

        <button
          type="button"
          className="cursor-pointer"
          onClick={() =>
            addToCart?.({
              id,
              name,
              price,
              img,
              newPrice,
            })
          }
        >
          <Plus width={15} />
        </button>
      </div>
    </div>
  )
}
