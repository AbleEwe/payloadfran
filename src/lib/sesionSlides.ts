import { getPayload } from './payload'

export type SesionSlideItem = {
  url: string
  caption: string
  path: string
}

/**
 * Slides to show on the home page (showOnHome === true), sorted by order.
 */
export async function getHomeSesionSlides(): Promise<SesionSlideItem[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'sesion-slides',
    where: { showOnHome: { equals: true } },
    sort: 'order',
    depth: 1,
  })
  return mapDocsToItems(result.docs)
}

/**
 * All slides for the Sesiones page, sorted by order.
 */
export async function getAllSesionSlides(): Promise<SesionSlideItem[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'sesion-slides',
    sort: 'order',
    depth: 1,
  })
  return mapDocsToItems(result.docs)
}

export type DropdownSesionItem = { title: string; path: string }

/** Data for a single sesion page: cover + gallery images. */
export type SesionPageData = {
  caption: string
  coverImageUrl: string | null
  gallery: { url: string }[]
}

/** Extract URL from a Payload media relation (object with url/filename) or return null. */
function getMediaUrl(media: unknown): string | null {
  if (!media || typeof media !== 'object') return null
  const m = media as { url?: string | null; filename?: string | null }
  if (typeof m.url === 'string' && m.url) return m.url
  if (typeof m.filename === 'string' && m.filename) return `/media/${m.filename}`
  return null
}

/** If url is relative, optionally prepend site origin so it works from any context. */
function toAbsoluteUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  if (!base) return url
  const origin = base.replace(/\/$/, '')
  return url.startsWith('/') ? `${origin}${url}` : `${origin}/${url}`
}

/**
 * Get one sesion by URL slug (e.g. "bodas" for /sesiones/bodas). Returns null if not found.
 */
export async function getSesionBySlug(slug: string | undefined): Promise<SesionPageData | null> {
  if (!slug) return null
  const pathSlug = slug.startsWith('/') ? slug : `/${slug}`
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'sesion-slides',
    where: { path: { equals: pathSlug } },
    limit: 1,
    depth: 2,
  })
  const doc = result.docs[0]
  if (!doc) return null

  const coverImage = getMediaUrl(doc.coverImage)

  const gallery = (doc.gallery ?? [])
    .map((g) => getMediaUrl(g.image))
    .filter((url): url is string => Boolean(url))
    .map((url) => ({ url }))

  const fallbackCover = coverImage ?? gallery[0]?.url ?? null
  const rawCover =
    typeof fallbackCover === 'string' && fallbackCover.trim() ? fallbackCover : null
  const coverImageUrl = rawCover ? toAbsoluteUrl(rawCover) : null
  const galleryWithUrls = gallery.map((g) => ({ url: toAbsoluteUrl(g.url) }))

  return {
    caption: doc.caption,
    coverImageUrl,
    gallery: galleryWithUrls,
  }
}

/**
 * Items for the nav dropdown (caption + path), sorted by order. Same collection as sesion-slides.
 */
export async function getDropdownSesionItems(): Promise<DropdownSesionItem[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'sesion-slides',
    sort: 'order',
    depth: 0,
  })
  return result.docs.map((doc) => ({
    title: doc.caption,
    path: doc.path.startsWith('/') ? doc.path : `/${doc.path}`,
  }))
}

function mapDocsToItems(
  docs: Array<{
    image?: { url?: string | null } | string | null
    caption: string
    path: string
  }>,
): SesionSlideItem[] {
  return docs
    .filter((doc) => doc.image && typeof doc.image === 'object' && doc.image.url)
    .map((doc) => ({
      url: (doc.image as { url: string }).url,
      caption: doc.caption,
      path: doc.path.startsWith('/') ? doc.path : `/${doc.path}`,
    }))
}
