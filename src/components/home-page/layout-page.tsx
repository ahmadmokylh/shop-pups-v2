import HeaderPage from './header/header-page'
import { categoryIcon } from '#/data/category-icon'
import { Link } from '@tanstack/react-router'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface LayoutPageProps {
  pageTitle: string
  children: React.ReactNode
}

export default function LayoutPage({ pageTitle, children }: LayoutPageProps) {
  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <HeaderPage pageTitle={pageTitle}>
        <div className="flex gap-6 mr-4">
          {categoryIcon.map((icon, i) => (
            <div
              key={i}
              className="flex items-center text-center cursor-pointer"
            >
              <Link
                to={icon.id}
                className="flex flex-col sm:flex-row w-full items-center gap-2"
              >
                <img
                  src={icon.icon}
                  alt={icon.title}
                  className="object-contain w-16.25 h-16.25 sm:w-20 sm:h-20"
                />
                <span className=" text-xs sm:text-sm leading-tight">
                  {icon.title}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </HeaderPage>

      <div className="flex gap-20">
        <div className="hidden sm:flex gap-20 mt-6 p-4">
          <div className="hidden  min-w-76.5 sm:flex flex-col gap-4">
            <h3 className="text-lg ">ترتيب</h3>
            <Select dir="rtl" defaultValue="last-added">
              <SelectTrigger className="w-full bg-white border border-border h-15! rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="low-to-hight">
                    السعر: من الأقل للأعلى
                  </SelectItem>
                  <SelectItem value="hight-to-low">
                    السعر: من الأعلى للأقل
                  </SelectItem>
                  <SelectItem value="last-added">أضيف حديثاً</SelectItem>
                  <SelectItem value="best-seller">افضل مبيعاً</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full">
          <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(180px,1fr))] mt-6 w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
