import { Link } from '@tanstack/react-router'

interface TopSectionProps {
  children: React.ReactNode
  isShowAll?: boolean
  path?: string
}

export function TopSection({ children, isShowAll, path }: TopSectionProps) {
  return (
    <div className="flex items-center w-full my-8" dir="rtl">
      <span className="px-3  text-gray-800 font-bold">{children}</span>
      <div className="flex-1 border-t border-gray-200"></div>
      {isShowAll && (
        <Link
          to={path}
          className="text-gray-800 text-xs underline cursor-pointer"
        >
          عرض الكل
        </Link>
      )}
    </div>
  )
}
