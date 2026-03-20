import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const linkZewnetrzny = defineType({
  name: 'linkZewnetrzny',
  title: 'Link zewnętrzny',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'tytul',
      title: 'Tytuł linku',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'nowyTab',
      title: 'Otwórz w nowym oknie',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'tytul',
      url: 'url',
    },
    prepare({ title, url }) {
      return {
        title,
        subtitle: url,
      }
    },
  },
})
