import { Link, linkOptions } from '@tanstack/react-router'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import type { NavigationLink } from '#/types/navigation'
import { MenuNavBar } from './home-page/header/nav-bar'
import { CartButton } from './ui/cart-button'
import { Separator } from './ui/separator'
import {
  Home,
  Phone,
  Search,
  ShoppingCart,
  TextAlignJustify,
} from 'lucide-react'
import { Badge } from './ui/badge'
import {
  cartStore,
  getCartCount,
  hydrateCartFromStorage,
} from '#/store/cart-store'
import { useStore } from '@tanstack/react-store'
import { useEffect } from 'react'

export const NavLinks: NavigationLink['items'] = [
  ...linkOptions([
    {
      title: 'اتصل بنا',
      to: '/contact-us',
    },

    {
      title: 'من نحن',
      to: '/mn-nhn',
    },
  ]),
]

export const SubNavLinks: NavigationLink['subItems'] = [
  ...linkOptions([
    { to: '/categories', title: 'كل التصنيفات' },
    { to: '/offers', title: 'العروض' },
    { to: '/organic-honey', title: 'العسل العضوي' },
    { to: '/honey-mixtures', title: 'خلطات العسل' },
    { to: '/hive-products', title: 'منتجات الخلية' },
    { to: '/farm-products', title: 'منتجات المزرعة' },
  ]),
]

const Logo = () => {
  return (
    <Link to="/" className="relative w-full max-w-37.5 h-12">
      <img
        src="./Logo.png"
        className="object-contain w-36 h-37.5 max-w-3xl"
        alt="althnayan"
      />
    </Link>
  )
}

export default function Navbar() {
  const items = useStore(cartStore, (state) => state.items)
  const itemCount = getCartCount(items)

  useEffect(() => {
    hydrateCartFromStorage()
  }, [])

  return (
    <>
      {/* Mobile Navigation */}

      <header className="md:hidden sticky top-0 left-0 right-0 z-50 bg-white">
        <nav className="flex md:hidden items-center justify-between px-4 py-3">
          <Sheets />

          <Link className="relative w-full h-9 max-w-37.5 mx-auto" to="/">
            <img
              src="./Logo.png"
              className="object-contain max-w-30"
              alt="althnayan"
            />
          </Link>
        </nav>
      </header>

      {/* Desktop Navigation */}
      <header className="hidden md:block sticky top-0 z-50  bg-white px-4 md:px-12">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex gap-4">
            <div>
              <Logo />
            </div>

            <MenuNavBar />
          </div>

          <CartButton />
        </div>
      </header>

      {/* Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white h-18 rounded-t-4xl shadow-2xl shadow-xl/30 shadow-blac border-t border-neutral-200">
        <div className="flex justify-around items-center w-full h-full">
          <Link to="/" className="text-[#7a4d00]">
            <Home className="" />
          </Link>

          <Link
            to="/cart"
            className="bg-[#7a4d00] text-[#fafafa] p-4 rounded-full"
          >
            {itemCount > 0 && (
              <Badge className="absolute top-4 -mr-2 bg-red-600 text-[10px] rounded-full">
                {items.length}
              </Badge>
            )}
            <ShoppingCart />
          </Link>

          <Search className="text-[#d8d8d8]" />
        </div>
      </div>
    </>
  )
}

function Sheets() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <TextAlignJustify />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-col gap-1 items-center">
          <SheetTitle>
            <img
              src="./Logo.png"
              className="object-contain w-36 h-37.5 max-w-3xl"
              alt="althnayan"
            />
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="grid  auto-rows-min gap-6 px-4 mr-4 mb-4">
          {SubNavLinks.map((item, i) => (
            <Link to={item.to} key={i}>
              {item.title}
            </Link>
          ))}
        </div>
        <Separator />
        <div className="grid  auto-rows-min gap-6 px-4 mr-4 my-4">
          {NavLinks.map((item, i) => (
            <Link key={i} to={item.to}>
              {item.title}
            </Link>
          ))}
        </div>
        <Separator />

        <div className="flex items-center  gap-2 px-4 mr-4 my-4">
          <Phone size={18} /> <span dir="ltr"> +96597388320</span>
        </div>
      </SheetContent>
    </Sheet>
  )
}
