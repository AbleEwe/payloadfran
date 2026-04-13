import { notFound } from 'next/navigation'
import { getSesionBySlug } from '@/lib/sesionSlides'
import SesionPageClient from './SesionPageClient'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ sesion: string }>
}

export default async function SesionPage({ params }: Props) {
  const { sesion: slug } = await params
  const sesion = await getSesionBySlug(slug)

  if (!sesion) notFound()

  return <SesionPageClient sesion={sesion} />
}
