import { NavLinks, SubNavLinks } from '#/components/nav-bar'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Link } from '@tanstack/react-router'

export function MenuNavBar() {
  return (
    <NavigationMenu dir="rtl">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>التصنيفات</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="p-3 ">
              <li>
                {SubNavLinks.map((itms, i) => (
                  <NavigationMenuLink
                    asChild
                    key={i}
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to={itms.to}>{itms.title}</Link>
                  </NavigationMenuLink>
                ))}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {NavLinks.map((item, i) => (
          <NavigationMenuItem key={i}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to={item.to}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
