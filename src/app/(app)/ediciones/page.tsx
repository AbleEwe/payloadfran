import { getEdicionesData } from '@/lib/ediciones'
import EdicionesClient from './EdicionesClient'

export const dynamic = 'force-dynamic'

export default async function EdicionesPage() {
  const data = await getEdicionesData()
  return <EdicionesClient data={data} />
}