import { defineType, defineField } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const wydarzenie = defineType({
  name: 'wydarzenie',
  title: 'Wydarzenie',
  type: 'document',
  icon: CalendarIcon,
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
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'tresc',
      options: { source: 'tytul', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'data',
      title: 'Data wydarzenia',
      type: 'date',
      group: 'tresc',
      options: { dateFormat: 'DD.MM.YYYY' },
    }),
    defineField({
      name: 'godzinaRozpoczecia',
      title: 'Godzina rozpoczęcia',
      type: 'string',
      group: 'tresc',
      description: 'np. 10:00',
    }),
    defineField({
      name: 'miejsce',
      title: 'Miejsce',
      type: 'string',
      group: 'tresc',
    }),
    defineField({
      name: 'typ',
      title: 'Typ wydarzenia',
      type: 'string',
      group: 'tresc',
      options: {
        list: [
          { title: 'Wykład', value: 'wyklad' },
          { title: 'Seminarium', value: 'seminarium' },
          { title: 'Konferencja', value: 'konferencja' },
          { title: 'Sympozjum', value: 'sympozjum' },
          { title: 'Warsztaty', value: 'warsztaty' },
          { title: 'Spotkanie', value: 'spotkanie' },
          { title: 'Msza św.', value: 'msza' },
          { title: 'Inne', value: 'inne' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'tresc',
      initialValue: 'upcoming',
      options: {
        list: [
          { title: '📅 Nadchodzące', value: 'upcoming' },
          { title: '📁 Archiwum', value: 'past' },
          { title: '❌ Odwołane', value: 'cancelled' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'jezyki',
      title: 'Języki',
      type: 'array',
      group: 'tresc',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Polski', value: 'PL' },
          { title: 'Angielski', value: 'EN' },
          { title: 'Niemiecki', value: 'DE' },
          { title: 'Hiszpański', value: 'ES' },
          { title: 'Włoski', value: 'IT' },
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'opis',
      title: 'Opis (PL)',
      type: 'blockContent',
      group: 'tresc',
    }),
    // ZMIANA: boolean → string
    defineField({
      name: 'relacja',
      title: 'Relacja z wydarzenia',
      type: 'string',
      group: 'tresc',
      description: 'Czy dostępna jest relacja/podsumowanie?',
      options: {
        list: [
          { title: '✅ Dostępna', value: 'available' },
          { title: '🔜 W przygotowaniu', value: 'preparing' },
          { title: '❌ Brak', value: 'none' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'linkRelacji',
      title: 'Link do relacji',
      type: 'url',
      group: 'tresc',
      hidden: ({ parent }) => parent?.relacja !== 'available',
    }),
    defineField({
      name: 'zdjecie',
      title: 'Zdjęcie',
      type: 'image',
      group: 'tresc',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Tekst alternatywny',
          type: 'string',
        }),
      ],
    }),

    // === TŁUMACZENIA ===
    defineField({ name: 'tytulEN', title: 'Tytuł (EN)', type: 'string', group: 'tlumaczenia' }),
    defineField({ name: 'opisEN', title: 'Opis (EN)', type: 'blockContent', group: 'tlumaczenia' }),
    defineField({ name: 'tytulDE', title: 'Tytuł (DE)', type: 'string', group: 'tlumaczenia' }),
    defineField({ name: 'opisDE', title: 'Opis (DE)', type: 'blockContent', group: 'tlumaczenia' }),
    defineField({ name: 'tytulES', title: 'Tytuł (ES)', type: 'string', group: 'tlumaczenia' }),
    defineField({ name: 'opisES', title: 'Opis (ES)', type: 'blockContent', group: 'tlumaczenia' }),
    defineField({ name: 'tytulIT', title: 'Tytuł (IT)', type: 'string', group: 'tlumaczenia' }),
    defineField({ name: 'opisIT', title: 'Opis (IT)', type: 'blockContent', group: 'tlumaczenia' }),

    // === SEO ===
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],

  orderings: [
    { name: 'dataDesc', title: 'Data (najnowsze)', by: [{ field: 'data', direction: 'desc' }] },
    { name: 'dataAsc', title: 'Data (najstarsze)', by: [{ field: 'data', direction: 'asc' }] },
  ],

  preview: {
    select: {
      title: 'tytul',
      date: 'data',
      status: 'status',
      type: 'typ',
      media: 'zdjecie',
    },
    prepare({ title, date, status, type, media }) {
      const statusEmoji = { upcoming: '📅', past: '📁', cancelled: '❌' }[status] || ''
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: `${type || ''} • ${date || 'Brak daty'}`,
        media,
      }
    },
  },
})
