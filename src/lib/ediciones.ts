import { getPayload } from './payload'

export type EdicionesPageData = {
  hero: {
    title: string
    backgroundImageUrl: string | null
  }
  needSection: {
    title: string
    subtitle: string
    bullets: string[]
  }
  packagesSection: {
    title: string
    subtitle: string
    backgroundImageUrl: string | null
    pricingHeading: string
    ctaText: string
    ctaLink: string
    packages: {
      title: string
      price: string
      subtitle?: string
      features: { text: string }[]
      imageUrl: string | null
      popular: boolean
    }[]
  }
  pricingTable: {
    packageTabLabel: string
    eventTabLabel: string
    packageRows: { type: string; quantity: string; price: string; isPopular: boolean }[]
    eventRows: { service: string; details: string; price: string }[]
  }
}

function urlFromMedia(media: unknown): string | null {
  if (!media) return null
  if (typeof media === 'object' && 'url' in media) {
    const u = (media as { url?: string | null }).url
    if (typeof u === 'string' && u) return u
  }
  return null
}

/** Resolve media to URL; if it's an ID, fetch the document. */
async function resolveMediaUrl(media: unknown): Promise<string | null> {
  const direct = urlFromMedia(media)
  if (direct) return direct
  const id = typeof media === 'string' ? media : typeof media === 'number' ? String(media) : null
  if (!id) return null
  try {
    const payload = await getPayload()
    const doc = await payload.findByID({
      collection: 'media',
      id,
      depth: 0,
    })
    return urlFromMedia(doc) || null
  } catch {
    return null
  }
}


export async function getEdicionesData(): Promise<EdicionesPageData> {
  const payload = await getPayload()
  const g = await payload.findGlobal({
    slug: 'ediciones',
    depth: 3,
  })

  const hero = g?.hero ?? { title: 'Ediciones', backgroundImage: null }
  const needSection = g?.needSection ?? { title: '¿Qué necesito?', subtitle: '', bullets: [] }
  const packagesSection = g?.packagesSection ?? {
    title: 'Paquetes Fotográficos',
    subtitle: '',
    backgroundImage: null,
    pricingHeading: 'Detalles de Precios',
    ctaText: '',
    ctaLink: '/contact',
    packages: [],
  }
  const pricingTable = g?.pricingTable ?? {
    packageTabLabel: 'Por Paquete',
    eventTabLabel: 'Por Evento',
    packageRows: [],
    eventRows: [],
  }

  const [heroUrl, packagesBgUrl] = await Promise.all([
    resolveMediaUrl(hero.backgroundImage),
    resolveMediaUrl(packagesSection.backgroundImage),
  ])

  return {
    hero: {
      title: hero.title ?? 'Ediciones',
      backgroundImageUrl: heroUrl,
    },
    needSection: {
      title: needSection.title ?? '¿Qué necesito?',
      subtitle: needSection.subtitle ?? '',
      bullets: (needSection.bullets ?? []).map((b: { text?: string }) => b.text ?? ''),
    },
    packagesSection: {
      title: packagesSection.title ?? 'Paquetes Fotográficos',
      subtitle: packagesSection.subtitle ?? '',
      backgroundImageUrl: packagesBgUrl,
      pricingHeading: packagesSection.pricingHeading ?? 'Detalles de Precios',
      ctaText: packagesSection.ctaText ?? '',
      ctaLink: packagesSection.ctaLink ?? '/contact',
      packages: await Promise.all(
        (packagesSection.packages ?? []).map(async (p: {
          title: string
          price: string
          subtitle?: string | null
          features?: { text: string }[] | null
          image?: unknown
          popular?: boolean | null
        }) => ({
          title: p.title,
          price: p.price,
          subtitle: p.subtitle ?? undefined,
          features: (p.features ?? []).map((f: { text?: string }) => ({ text: f.text ?? '' })),
          imageUrl: await resolveMediaUrl(p.image),
          popular: p.popular ?? false,
        }))
      ),
    },
    pricingTable: {
      packageTabLabel: pricingTable.packageTabLabel ?? 'Por Paquete',
      eventTabLabel: pricingTable.eventTabLabel ?? 'Por Evento',
      packageRows: (pricingTable.packageRows ?? []).map((r: { type: string; quantity?: string | null; price: string; isPopular?: boolean | null }) => ({
        type: r.type,
        quantity: r.quantity ?? '',
        price: r.price,
        isPopular: r.isPopular ?? false,
      })),
      eventRows: (pricingTable.eventRows ?? []).map((r: { service: string; details?: string | null; price: string }) => ({
        service: r.service,
        details: r.details ?? '',
        price: r.price,
      })),
    },
  }
}
