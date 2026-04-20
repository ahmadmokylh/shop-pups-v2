import { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const imgs = [
    { alt: 'image 1', src: '/image1.png' },
    { alt: 'image 2', src: '/image2.png' },
    { alt: 'image 3', src: '/image3.png' },
    { alt: 'image 4', src: '/image4.png' },
  ]

  const mob_imgs = [
    { alt: 'image 1', src: './mobile/image1.png' },
    { alt: 'image 2', src: './mobile/image2.png' },
    { alt: 'image 3', src: './mobile/image3.png' },
    { alt: 'image 4', src: './mobile/image4.png' },
  ]

  return (
    <section className="w-full cursor-pointer">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        dir="rtl"
        opts={{ direction: 'rtl' }}
      >
        <CarouselContent>
          {/* نعتمد على مصفوفة واحدة في الـ map، ونجلب الصورة المقابلة من المصفوفة الثانية باستخدام الـ index (i) */}
          {imgs.map((img, i) => (
            <CarouselItem key={i} className="basis-full">
              <picture>
                {/* للشاشات الكبيرة (lg وما فوق - 1024px) نعرض صور الـ Desktop */}
                <source media="(min-width: 1024px)" srcSet={img.src} />

                {/* للشاشات الأصغر نعرض صور الـ Mobile بشكل افتراضي */}
                <img
                  src={mob_imgs[i]?.src}
                  alt={img.alt}
                  className="object-fill object-center w-full h-full"
                />
              </picture>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots Navigation */}
        <div className="relative bottom-7 flex justify-center items-center gap-1">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                'rounded-full cursor-pointer',
                index === current
                  ? 'bg-chart-5 w-2 h-2'
                  : 'bg-white w-1 h-1 hover:opacity-50',
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  )
}
