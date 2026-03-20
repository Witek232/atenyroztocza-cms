import { defineType, defineField, defineArrayMember } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const galeria = defineType({
  name: 'galeria',
  title: 'Galeria — album',
  type: 'document',
  icon: ImagesIcon,
  groups: [
    { name: 'tresc', title: 'Treść', default: true },
    { name: 'tlumaczenia', title: 'Tłumaczenia' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'tytul',
      title: 'Tytuł',
      type: 'string',
      group: 'tresc',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'tytul', maxLength: 96 },
      group: 'tresc',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rok',
      title: 'Rok',
      type: 'number',
      group: 'tresc',
      validation: (rule) => rule.min(1900).max(2100),
    }),
    defineField({
      name: 'opis',
      title: 'Opis (PL)',
      type: 'blockContent',
      group: 'tresc',
    }),
    defineField({
      name: 'okladka',
      title: 'Okładka albumu',
      type: 'image',
      group: 'tresc',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'zdjecia',
      title: 'Zdjęcia',
      type: 'array',
      group: 'tresc',
      of: [
        defineArrayMember({
          type: 'zdjecieZPodpisem',
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),

    // Tłumaczenia
    defineField({ name: 'tytulEN', title: 'Tytuł (EN)', type: 'string', group: 'tlumaczenia' }),
    defineField({ name: 'opisEN', title: 'Opis (EN)', type: 'blockContent', group: 'tlumaczenia' }),
    defineField({ name: 'tytulDE', title: 'Tytuł (DE)', type: 'string', group: 'tlumaczenia' }),
    defineField({ name: 'opisDE', title: 'Opis (DE)', type: 'blockContent', group: 'tlumaczenia' }),
    defineField({ name: 'tytulES', title: 'Tytuł (ES)', type: 'string', group: 'tlumaczenia' }),
    defineField({ name: 'opisES', title: 'Opis (ES)', type: 'blockContent', group: 'tlumaczenia' }),
    defineField({ name: 'tytulIT', title: 'Tytuł (IT)', type: 'string', group: 'tlumaczenia' }),
    defineField({ name: 'opisIT', title: 'Opis (IT)', type: 'blockContent', group: 'tlumaczenia' }),

    // SEO
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],

  orderings: [
    { name: 'rokDesc', title: 'Rok (najnowsze)', by: [{ field: 'rok', direction: 'desc' }] },
  ],

  preview: {
    select: {
      title: 'tytul',
      rok: 'rok',
      media: 'okladka',
      images: 'zdjecia',
    },
    prepare({ title, rok, media, images }) {
      const count = images?.length || 0
      return {
        title,
        subtitle: `${rok || ''} • ${count} zdjęć`,
        media,
      }
    },
  },
})
