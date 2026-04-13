import { getHomeSesionSlides } from '@/lib/sesionSlides'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const homeSlides = await getHomeSesionSlides()
  return <HomeClient homeSlides={homeSlides} />
}
