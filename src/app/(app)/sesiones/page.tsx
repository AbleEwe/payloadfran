import { getAllSesionSlides } from '@/lib/sesionSlides'
import SesionesClient from './SesionesClient'

export const dynamic = 'force-dynamic'

export default async function Sesiones() {
  const slides = await getAllSesionSlides()
  return <SesionesClient slides={slides} />
}
