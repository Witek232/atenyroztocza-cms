import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const kategoria = defineType({
  name: 'kategoria',
  title: 'Kategoria',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'nazwa',
      title: 'Nazwa (PL)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nazwaEN',
      title: 'Nazwa (EN)',
      type: 'string',
    }),
    defineField({
      name: 'nazwaDE',
      title: 'Nazwa (DE)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nazwa' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'opis',
      title: 'Opis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'kolor',
      title: 'Kolor',
      type: 'string',
      description: 'Kolor wyświetlany w UI (hex)',
      validation: (rule) =>
        rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: 'hex color',
          invert: false,
        }),
    }),
    defineField({
      name: 'ikona',
      title: 'Ikona',
      type: 'string',
      description: 'Nazwa ikony (np. z Lucide Icons)',
    }),
  ],

  preview: {
    select: {
      title: 'nazwa',
      subtitle: 'slug.current',
    },
  },
})
