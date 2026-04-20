import { Layout } from '#/components/home-page/layout'
import ImageSection from '#/components/home-page/sections/image-section'
import { HeroSection } from '#/components/home-page/sections/hero-section'
import Sections from '#/components/home-page/sections/sections'
import Testimonials from '#/components/home-page/sections/testimonials-section'
import { Card, CardContent, CardFooter, CardHeader } from '#/components/ui/card'
import { Skeleton } from '#/components/ui/skeleton'

function SectionHeaderSkeleton({ showLink = false }: { showLink?: boolean }) {
  return (
    <div className="flex items-center w-full my-8" dir="rtl">
      <Skeleton className="h-6 w-32 rounded-full" />
      <div className="flex-1 border-t border-gray-200 mx-3" />
      {showLink && <Skeleton className="h-4 w-14 rounded-full" />}
    </div>
  )
}

function ProductCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <Card
      className={compact ? 'h-82.25 max-w-75 py-3' : 'h-103.75 max-w-75'}
      aria-hidden="true"
    >
      <CardHeader
        className={compact ? 'px-2 py-0 h-67' : 'px-4 py-0 h-67'}
        dir="ltr"
      >
        <Skeleton className={compact ? 'h-41.25 w-full rounded-xl' : 'h-65 w-full rounded-xl'} />
        <Skeleton className="absolute top-10 h-6 w-16 rounded-full" />
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-3/4 mr-auto" />
          <Skeleton className="h-3 w-full" />
        </div>
      </CardContent>

      <CardFooter
        className={
          compact
            ? 'flex flex-col items-start px-3 gap-2'
            : 'flex justify-between px-4'
        }
      >
        <Skeleton className={compact ? 'h-4 w-20 mr-2' : 'h-4 w-28'} />
        <Skeleton
          className={compact ? 'h-8 w-full rounded-xl' : 'h-8 w-28 rounded-xl'}
        />
      </CardFooter>
    </Card>
  )
}

function ProductGridSkeleton({
  compact = false,
  count,
}: {
  compact?: boolean
  count: number
}) {
  return (
    <div
      className={
        compact
          ? 'grid gap-3 grid-cols-[repeat(auto-fill,minmax(180px,1fr))] mt-6'
          : 'grid gap-3 grid-cols-[repeat(auto-fill,minmax(290px,1fr))] mt-6'
      }
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton
          key={`${compact ? 'compact' : 'default'}-${index}`}
          compact={compact}
        />
      ))}
    </div>
  )
}

function CarouselSkeleton() {
  return (
    <section className="w-full">
      <SectionHeaderSkeleton showLink />
      <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="p-1">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  )
}

export function HomePagePending() {
  return (
    <main>
      <HeroSection />
      <Layout>
        <CarouselSkeleton />
        <Sections />
        <section>
          <SectionHeaderSkeleton />
          <ProductGridSkeleton count={3} />
        </section>
        <section>
          <SectionHeaderSkeleton />
          <ProductGridSkeleton compact count={8} />
        </section>
        <section>
          <SectionHeaderSkeleton />
          <ProductGridSkeleton count={6} />
        </section>
      </Layout>
      <ImageSection />
      <Testimonials />
    </main>
  )
}
