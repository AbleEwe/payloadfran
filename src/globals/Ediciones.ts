import type { GlobalConfig } from 'payload'

export const Ediciones: GlobalConfig = {
  slug: 'ediciones',
  access: { read: () => true },
  fields: [
    {
      type: 'group',
      name: 'hero',
      label: 'Hero (top of page)',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Ediciones',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Background image for the top section.' },
        },
      ],
    },
    {
      type: 'group',
      name: 'needSection',
      label: '"¿Qué necesito?" section',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: '¿Qué necesito?' },
        { name: 'subtitle', type: 'text', defaultValue: 'Horarios de atención: De 10:00 am a 8:00 pm' },
        {
          name: 'bullets',
          type: 'array',
          label: 'Bullet points',
          defaultValue: [
            { text: 'Se pide enviar su foto con la mejor calidad posible para un mejor resultado al correo francescahdezs@gmail.com' },
            { text: 'Haz tu lista muy detallada de lo que quiere que sea editado' },
            { text: 'Al entregar la foto terminada solo puede ser modificada una vez más' },
            { text: 'Se empieza a trabajar cuando el pago esté hecho.' },
          ],
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
    {
      type: 'group',
      name: 'packagesSection',
      label: 'Packages section',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: 'Paquetes Fotográficos' },
        {
          name: 'subtitle',
          type: 'text',
          defaultValue: 'Elige el paquete que mejor se adapte a tus necesidades y transforma tus momentos en recuerdos eternos',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional background image for the packages section.' },
        },
        { name: 'pricingHeading', type: 'text', defaultValue: 'Detalles de Precios' },
        { name: 'ctaText', type: 'text', defaultValue: '¿Tienes un proyecto específico en mente? Contáctanos para una cotización personalizada.' },
        { name: 'ctaLink', type: 'text', defaultValue: '/contact' },
        {
          name: 'packages',
          type: 'array',
          label: 'Package cards',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'price', type: 'text', required: true },
            { name: 'subtitle', type: 'text' },
            {
              name: 'features',
              type: 'array',
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'popular', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'pricingTable',
      label: 'Pricing table',
      fields: [
        {
          name: 'packageTabLabel',
          type: 'text',
          defaultValue: 'Por Paquete',
        },
        {
          name: 'eventTabLabel',
          type: 'text',
          defaultValue: 'Por Evento',
        },
        {
          name: 'packageRows',
          type: 'array',
          label: 'Rows (Por Paquete)',
          admin: { description: 'Tipo, Cantidad, Precio por unidad. Use empty quantity for row span (same type).' },
          fields: [
            { name: 'type', type: 'text', required: true },
            { name: 'quantity', type: 'text' },
            { name: 'price', type: 'text', required: true },
            { name: 'isPopular', type: 'checkbox', defaultValue: false },
          ],
        },
        {
          name: 'eventRows',
          type: 'array',
          label: 'Rows (Por Evento)',
          fields: [
            { name: 'service', type: 'text', required: true },
            { name: 'details', type: 'text' },
            { name: 'price', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
