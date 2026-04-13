'use client'

import PageTransition from '@/components/ui/PageTransition'
import SesionsBackground from '@/components/layout/SesionsBackground'
import PhotosLayout from '@/components/layout/PhotosLayout'
import type { SesionPageData } from '@/lib/sesionSlides'

type SesionPageClientProps = {
  sesion: SesionPageData
}

export default function SesionPageClient({ sesion }: SesionPageClientProps) {
  const coverPhotos = sesion.coverImageUrl
    ? [{ ImageBg: sesion.coverImageUrl }]
    : []

  return (
    <PageTransition>
      <div>
        <SesionsBackground photos={coverPhotos} />
        <PhotosLayout pictures={sesion.gallery} />
      </div>
    </PageTransition>
  )
}
