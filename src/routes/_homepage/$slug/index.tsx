import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { getAllProducts } from '#/server/get-all-products'
import {
  addToCart,
  cartStore,
  removeFromCart,
  removeOneFromCart,
} from '#/store/cart-store'
import type { ProductType } from '#/types/product'
import { createFileRoute, notFound, useNavigate } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { Minus, Plus, Trash2 } from 'lucide-react'

export const Route = createFileRoute('/_homepage/$slug/')({
  loader: async ({ params }) => {
    const products: ProductType[] = await getAllProducts()

    const product = products.find((p) => p.slug === params.slug)

    if (!product) {
      throw notFound()
    }

    return { product }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { product } = Route.useLoaderData()

  const navigate = useNavigate()

  const items = useStore(cartStore, (state) => state.items)
  const quantity = items.find((item) => item.id === product.id)?.quantity

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <div className="flex gap-6 px-6 py-8">
        <div className="w-full flex items-start flex-1 mt-6 gap-10 max-lg:flex-col max-lg:items-center">
          <section className="w-[33.6667%] max-lg:w-full max-lg:flex max-lg:justify-center">
            <img
              alt={product.name}
              src={product.img}
              className="w-[357.9px] sm:w-[602.9px] rounded-2xl"
            />
          </section>
          <section className="w-[66.3333%] max-lg:w-full flex flex-col gap-9 mt-6">
            <h1 className="text-2xl font-bold">{product.name}</h1>

            {product.offer && (
              <Badge className="bg-red-500 rounded-sm! text-xs p-3">
                {product.offer?.replace('$', '-').replace('off', 'د.ك')}
              </Badge>
            )}

            <p className="whitespace-pre-line text-sm">
              الوصف
              {product.description}
            </p>

            {product.newPrice ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl text-chart-5 font-semibold">
                  {product.newPrice.toFixed(3)} د.ك
                </span>

                <span className=" line-through text-[#acacac]">
                  {product.price.toFixed(3)} د.ك
                </span>

                <Badge className="bg-red-500 rounded-sm! text-xs px-3">
                  {product.offer?.replace('$', 'وفَر').replace('off', 'د.ك')}
                </Badge>
              </div>
            ) : (
              <span className="text-2xl text-chart-5 font-semibold">
                {product.price.toFixed(3)} د.ك
              </span>
            )}

            {(quantity ?? 0) > 0 ? (
              <Button
                onClick={() => navigate({ to: '/cart' })}
                className={cn(
                  'h-20 w-1/2 max-lg:w-full hidden sm:flex justify-between  items-center px-8',
                )}
              >
                <span className="text-[15px]">الذهاب الى السلة</span>

                <div className="bg-[#fafafa] p-3 rounded-lg flex items-center justify-between gap-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromCart(product.id)
                    }}
                    className="text-black cursor-pointer"
                  >
                    <Trash2 />
                  </button>
                  {(quantity ?? 1) > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeOneFromCart(product.id)
                      }}
                      className="text-black cursor-pointer"
                    >
                      <Minus />
                    </button>
                  )}
                  <span className="text-black">{quantity}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart({
                        id: product.id,
                        img: product.img,
                        name: product.name,
                        price: product.price,
                        newPrice: product.newPrice,
                      })
                    }}
                    className="text-black cursor-pointer"
                  >
                    <Plus />
                  </button>
                </div>
              </Button>
            ) : (
              <Button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    img: product.img,
                    name: product.name,
                    price: product.price,
                    newPrice: product.newPrice,
                  })
                }
                className={cn('h-20 w-1/2 max-lg:w-full hidden sm:block')}
              >
                أضف الى السلة
              </Button>
            )}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#fafafa] h-30 rounded-t-2xl shadow-2xl border-t border-gray-400">
              <div className="flex justify-center items-center h-full px-6">
                {(quantity ?? 0) > 0 ? (
                  <Button
                    onClick={() => navigate({ to: '/cart' })}
                    className={cn(
                      'w-full h-20 justify-between  items-center px-8',
                    )}
                  >
                    <span className="text-[15px]">الذهاب الى السلة</span>

                    <div className="bg-[#fafafa] p-3 rounded-lg flex items-center justify-between gap-6">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFromCart(product.id)
                        }}
                        className="text-black cursor-pointer"
                      >
                        <Trash2 />
                      </button>
                      {(quantity ?? 1) > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeOneFromCart(product.id)
                          }}
                          className="text-black cursor-pointer"
                        >
                          <Minus />
                        </button>
                      )}
                      <span className="text-black">{quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart({
                            id: product.id,
                            img: product.img,
                            name: product.name,
                            price: product.price,
                            newPrice: product.newPrice,
                          })
                        }}
                        className="text-black cursor-pointer"
                      >
                        <Plus />
                      </button>
                    </div>
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        img: product.img,
                        name: product.name,
                        price: product.price,
                        newPrice: product.newPrice,
                      })
                    }
                    className="w-full h-20"
                  >
                    أضف الى السلة
                  </Button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

// className="w-full h-20"
