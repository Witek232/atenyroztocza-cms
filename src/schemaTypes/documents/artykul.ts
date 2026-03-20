import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const artykul = defineType({
  name: 'artykul',
  title: 'Artykuł prasowy',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'tresc', title: 'Treść', default: true },
    { name: 'tlumaczenia', title: 'Tłumaczenia' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // === TREŚĆ ===
    defineField({
      name: 'tytul',
      title: 'Tytuł',
      type: 'string',
      group: 'tresc',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'tresc',
      options: {
        source: 'tytul',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[ąćęłńóśźż]/g, (c) => 
              ({ ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' }[c] || c)
            )
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'data',
      title: 'Data publikacji',
      type: 'date',
      group: 'tresc',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
    }),
    defineField({
      name: 'zrodlo',
      title: 'Źródło',
      type: 'string',
      group: 'tresc',
      options: {
        list: [
          { title: 'Nasz Dziennik', value: 'nasz-dziennik' },
          { title: 'Niedziela', value: 'niedziela' },
          { title: 'Radio Maryja', value: 'radio-maryja' },
          { title: 'Gość Niedzielny', value: 'gosc-niedzielny' },
          { title: 'Inne', value: 'inne' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'kategorie',
      title: 'Kategorie',
      type: 'array',
      group: 'tresc',
      of: [{ type: 'reference', to: [{ type: 'kategoria' }] }],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'streszczenie',
      title: 'Streszczenie (PL)',
      type: 'text',
      rows: 3,
      group: 'tresc',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'tresc',
      title: 'Treść (PL)',
      type: 'blockContent',
      group: 'tresc',
    }),
    defineField({
      name: 'linkZewnetrzny',
      title: 'Link do oryginału',
      type: 'url',
      group: 'tresc',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'czasCzytania',
      title: 'Czas czytania (min)',
      type: 'number',
      group: 'tresc',
      validation: (rule) => rule.min(1).max(60),
    }),
    defineField({
      name: 'zdjecie',
      title: 'Zdjęcie główne',
      type: 'image',
      group: 'tresc',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Tekst alternatywny',
          type: 'string',
          description: 'Opis zdjęcia dla czytników ekranu',
        }),
      ],
    }),

    // === TŁUMACZENIA ===
    defineField({
      name: 'tytulEN',
      title: 'Tytuł (EN)',
      type: 'string',
      group: 'tlumaczenia',
    }),
    defineField({
      name: 'streszczeniEN',
      title: 'Streszczenie (EN)',
      type: 'text',
      rows: 3,
      group: 'tlumaczenia',
    }),
    defineField({
      name: 'trescEN',
      title: 'Treść (EN)',
      type: 'blockContent',
      group: 'tlumaczenia',
    }),
    defineField({
      name: 'tytulDE',
      title: 'Tytuł (DE)',
      type: 'string',
      group: 'tlumaczenia',
    }),
    defineField({
      name: 'streszczeniDE',
      title: 'Streszczenie (DE)',
      type: 'text',
      rows: 3,
      group: 'tlumaczenia',
    }),
    defineField({
      name: 'trescDE',
      title: 'Treść (DE)',
      type: 'blockContent',
      group: 'tlumaczenia',
    }),

    // === SEO ===
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],

  orderings: [
    {
      name: 'dataDesc',
      title: 'Data (najnowsze)',
      by: [{ field: 'data', direction: 'desc' }],
    },
    {
      name: 'dataAsc',
      title: 'Data (najstarsze)',
      by: [{ field: 'data', direction: 'asc' }],
    },
    {
      name: 'tytulAsc',
      title: 'Tytuł A-Z',
      by: [{ field: 'tytul', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'tytul',
      subtitle: 'zrodlo',
      date: 'data',
      media: 'zdjecie',
    },
    prepare({ title, subtitle, date, media }) {
      const zrodlaLabels: Record<string, string> = {
        'nasz-dziennik': 'Nasz Dziennik',
        'niedziela': 'Niedziela',
        'radio-maryja': 'Radio Maryja',
        'gosc-niedzielny': 'Gość Niedzielny',
        'inne': 'Inne',
      }
      return {
        title,
        subtitle: `${zrodlaLabels[subtitle] || subtitle || ''}${date ? ' • ' + date : ''}`,
        media,
      }
    },
  },
})
