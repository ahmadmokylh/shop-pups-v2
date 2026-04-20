import { TopSection } from '#/components/ui/top-section'
import { categoryIcon } from '#/data/category-icon'
import { Link } from '@tanstack/react-router'

export default function Sections() {
  return (
    <section>
      <TopSection>الأقسام</TopSection>
      <div className=" grid grid-cols-3 gap-x-10 gap-y-7 justify-items-center items-center sm:flex sm:justify-center sm:items-center sm:gap-6">
        {categoryIcon.map((icon, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center w-31.75 h-31.75 sm:w-50 sm:h-50 cursor-pointer"
          >
            <Link to={icon.id}>
              <img
                src={icon.icon}
                alt={icon.title}
                className="object-contain w-16.25 h-16.25 sm:w-31.75 sm:h-31.75 mb-6"
              />
              <span className=" text-sm sm:text-lg leading-tight">
                {icon.title}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
