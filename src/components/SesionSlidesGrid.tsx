'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { SesionSlideItem } from '@/lib/sesionSlides'

const gridClass =
  'grid grid-cols-1 md:grid-cols-3 h-auto mx-auto gap-x-10 px-8 md:px-16 gap-y-10 pb-20'
const cardClass =
  'w-full h-full block object-cover rounded-lg transition-all duration-300 ease-in-out group-hover:brightness-70 group-hover:scale-102'
const captionClass =
  'absolute bottom-[15%] left-1/2 transform -translate-x-1/2 bg-[rgba(177,149,142,0.7)] text-white p-2 w-[60%] text-center text-3xl font-black rounded-md'

type SesionSlidesGridProps = {
  slides: SesionSlideItem[]
  /** Optional section class (e.g. for sesiones page without pb-20) */
  className?: string
  /** Sesiones page uses slightly different section class */
  variant?: 'home' | 'sesiones'
}

export default function SesionSlidesGrid({
  slides,
  className,
  variant = 'home',
}: SesionSlidesGridProps) {
  const sectionClass =
    variant === 'sesiones'
      ? 'grid grid-cols-1 md:grid-cols-3 h-auto mx-auto gap-x-10 gap-y-10 px-8 md:px-16 pb-8 md:pb-16'
      : gridClass

  if (!slides.length) return null

  return (
    <section className={className ?? sectionClass}>
      {slides.map((slide, index) => (
        <div
          className="w-full relative break-inside-avoid"
          key={`${slide.path}-${index}`}
        >
          <Link href={slide.path}>
            <Image
              src={slide.url}
              alt={slide.caption}
              loading="lazy"
              className={cardClass}
              width={400}
              height={600}
            />
            <span className={captionClass}>{slide.caption}</span>
          </Link>
        </div>
      ))}
    </section>
  )
}
