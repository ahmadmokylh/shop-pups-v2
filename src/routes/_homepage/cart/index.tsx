import { buttonVariants } from '#/components/ui/button'
import {
  calculateCartTotal,
  cartStore,
  clearCart,
  getCartCount,
  removeFromCart,
  removeOneFromCart,
} from '#/store/cart-store'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { CartItemCard } from '../../../components/ui/cart-item-card'

export const Route = createFileRoute('/_homepage/cart/')({
  component: RouteComponent,
})

function RouteComponent() {
  const items = useStore(cartStore, (state) => state.items)
  const itemCount = getCartCount(items)
  const total = calculateCartTotal(items)

  return (
    <main className="p-6 min-h-screen">
      <div className="my-6">
        {itemCount > 0 ? (
          <>
            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between items-center sm:w-1/2">
                <span className="text-md">
                  محتويات السلة {`(${items.length})`}
                </span>
                <span
                  onClick={() => clearCart()}
                  className="text-red-500 underline text-sm font-light ml-5 cursor-pointer"
                >
                  إفراغ السلة
                </span>
              </div>

              <div className="w-full flex justify-between gap-10 sm:px-6 items-start ">
                <div className="w-full">
                  {items.map((item, i) => (
                    <CartItemCard
                      className="w-full!"
                      key={i}
                      id={item.id}
                      img={item.img}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      newPrice={item.newPrice}
                      removeFromCart={() => removeFromCart(item.id)}
                      removeOneFromCart={() => removeOneFromCart(item.id)}
                    />
                  ))}
                </div>

                <div className="w-full hidden sm:flex flex-col gap-3 ">
                  <span>المجموع الكلي</span>

                  <span className="text-[#5a3519] font-bold text-2xl">
                    {total} د.ك.
                  </span>

                  <div className="w-full flex justify-between items-center gap-4">
                    <Link
                      to="/checkout"
                      className={buttonVariants({
                        variant: 'anotherBtn',
                        className: 'border-chart-5! w-1/2 h-12.5 text-white',
                      })}
                    >
                      الدفع
                    </Link>

                    <Link
                      className={buttonVariants({
                        variant: 'outLineAnotherBtn',
                        className: 'border-chart-5! w-1/2 h-12.5',
                      })}
                      to="/"
                    >
                      متابعة التسوق
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#fafafa] h-35 rounded-t-3xl  shadow-xl/30 shadow-blac border-t border-neutral-200">
              <div className="flex flex-col items-center w-full px-6 py-6 gap-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm">المجموع الكلي</span>
                  <span className="text-[#5a3519] font-bold ">
                    {total} د.ك.
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className={buttonVariants({
                    variant: 'anotherBtn',
                    className: 'border-chart-5! w-full h-12.5',
                  })}
                >
                  الدفع
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col py-5px-4 gap-4 items-center max-w-90">
              <h1 className="font-semibold text-2xl text-[#5a3519]">
                السلة فارغة
              </h1>

              <p className="text-center font-light">
                أضف ما تود شراءه الى السلة لإظهاره هنا والمضي قدماً لإتمام عملية
                الشراء
              </p>
            </div>

            <Link
              to="/"
              className={buttonVariants({
                variant: 'anotherBtn',
                className: 'bg-[#5a3519] text-white py-7 rounded-2xl  ',
              })}
            >
              ابدأ التسوق الآن
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
