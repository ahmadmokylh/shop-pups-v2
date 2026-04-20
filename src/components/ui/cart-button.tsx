import { ShoppingCart } from 'lucide-react'
import { Button, buttonVariants } from './button'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
import { useStore } from '@tanstack/react-store'
import {
  addToCart,
  calculateCartTotal,
  cartStore,
  getCartCount,
  removeFromCart,
  removeOneFromCart,
} from '#/store/cart-store'
import { TopSection } from './top-section'
import { cn } from '#/lib/utils'
import { Link } from '@tanstack/react-router'
import { CartItemCard } from './cart-item-card'

export function CartButton() {
  const items = useStore(cartStore, (state) => state.items)
  const itemCount = getCartCount(items)
  const total = calculateCartTotal(items)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={itemCount > 0 ? 'addedToCart' : 'outline'}
          className="px-5 rounded-lg border-black/70"
        >
          <ShoppingCart className="w-5 h-5" />

          {itemCount > 0 && items.length}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        className={cn(
          `bg-white ml-8 ${itemCount > 0 ? 'w-100 ' : 'w-sm'} shadow-2xl `,
        )}
      >
        {itemCount > 0 ? (
          <div className="w-full">
            <TopSection>محتويات</TopSection>
            <div className="flex flex-col items-center justify-start overflow-y-auto  max-h-100">
              <div>
                {items.map((item, i) => (
                  <CartItemCard
                    id={item.id}
                    img={item.img}
                    name={item.name}
                    price={item.price}
                    newPrice={item.newPrice}
                    quantity={item.quantity}
                    addToCart={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        img: item.img,
                        price: item.price,
                        newPrice: item.newPrice,
                      })
                    }
                    removeFromCart={() => removeFromCart(item.id)}
                    removeOneFromCart={() => removeOneFromCart(item.id)}
                    key={i}
                  />
                ))}
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="flex justify-between items-center py-4">
                <span className="text-sm text-gray-500">المجموع الكلي:</span>
                <span className="text-sm font-semibold text-[#5a3519]">
                  {total.toFixed(3)} د.ك.
                </span>
              </div>

              <Link
                to="/cart"
                className={buttonVariants({
                  variant: 'outLineAnotherBtn',
                  className: 'border-chart-5!  h-12.5',
                })}
              >
                الذهاب الى صفحة السلة
              </Link>

              <Link
                to="/checkout"
                className={buttonVariants({
                  variant: 'anotherBtn',
                  className: 'h-12.5',
                })}
              >
                الدفع
              </Link>
            </div>
          </div>
        ) : (
          <div className=" h-33 flex-col flex items-center gap-4 py-2.5 px-[12.5px]  justify-center">
            <p className="text-chart-5 text-2xl font-semibold">السلة الفارغة</p>
            <p className=" text-accent-foreground/50  text-[14px] font-semibold text-center">
              أضف ما تود شراءه إلى السلة لإظهاره هنا والمضي قدماً لإتمام عملية
              الشراء
            </p>
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
