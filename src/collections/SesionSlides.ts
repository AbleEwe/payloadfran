import type { CollectionConfig } from 'payload'

export const SesionSlides: CollectionConfig = {
  slug: 'sesion-slides',
  admin: {
    useAsTitle: 'caption',
    defaultColumns: ['caption', 'path', 'showOnHome', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Image shown in the card (home and/or sesiones page).',
      },
    },
    {
      name: 'caption',
      type: 'text',
      required: true,
      admin: {
        description: 'Label shown on the card (e.g. "Maternidad", "Bodas").',
      },
    },
    {
      name: 'path',
      type: 'text',
      required: true,
      admin: {
        description: 'URL path for the link (e.g. /maternidad, /bodas). Use a leading slash.',
      },
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this card on the home page. If unchecked, it only appears on the Sesiones page.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Sort order (lower numbers first). Used on both home and sesiones pages.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional hero/background image for this sesion’s page (/sesiones/[slug]). If empty, first gallery image is used.',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      admin: {
        description: 'Images shown on this sesion’s page (e.g. /sesiones/bodas).',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
