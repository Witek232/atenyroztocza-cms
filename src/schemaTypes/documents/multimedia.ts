import { defineType, defineField, defineArrayMember } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const materialAudiowizualny = defineType({
  name: 'materialAudiowizualny',
  title: 'Materiał audiowizualny',
  type: 'document',
  icon: PlayIcon,
  groups: [
    { name: 'tresc', title: 'Treść', default: true },
    { name: 'filmy', title: 'Filmy YouTube' },
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
    }),
    defineField({
      name: 'data',
      title: 'Data',
      type: 'date',
      group: 'tresc',
    }),
    defineField({
      name: 'miejsce',
      title: 'Miejsce',
      type: 'string',
      group: 'tresc',
    }),
    defineField({
      name: 'kategoria',
      title: 'Kategoria',
      type: 'string',
      group: 'tresc',
      options: {
        list: [
          { title: 'Wykład', value: 'wyklad' },
          { title: 'Seminarium', value: 'seminarium' },
          { title: 'Konferencja', value: 'konferencja' },
          { title: 'Homilia', value: 'homilia' },
          { title: 'Wywiad', value: 'wywiad' },
          { title: 'Inne', value: 'inne' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'tagi',
      title: 'Tagi',
      type: 'array',
      group: 'tresc',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'opis',
      title: 'Opis (PL)',
      type: 'blockContent',
      group: 'tresc',
    }),
    defineField({
      name: 'miniatura',
      title: 'Miniatura',
      type: 'image',
      group: 'tresc',
      options: { hotspot: true },
      description: 'Jeśli puste, użyje miniaturki z YouTube',
    }),

    // Filmy
    defineField({
      name: 'czesci',
      title: 'Części (filmy YouTube)',
      type: 'array',
      group: 'filmy',
      of: [
        defineArrayMember({
          type: 'youtubeEmbed',
        }),
      ],
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
    { name: 'dataDesc', title: 'Data (najnowsze)', by: [{ field: 'data', direction: 'desc' }] },
  ],

  preview: {
    select: {
      title: 'tytul',
      rok: 'rok',
      kategoria: 'kategoria',
      media: 'miniatura',
      czesci: 'czesci',
    },
    prepare({ title, rok, kategoria, media, czesci }) {
      const count = czesci?.length || 0
      return {
        title,
        subtitle: `${kategoria || ''} • ${rok || ''} • ${count} części`,
        media,
      }
    },
  },
})
