import { defineType, defineField, defineArrayMember } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export const nawigacja = defineType({
  name: 'nawigacja',
  title: 'Menu nawigacji',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'nazwa',
      title: 'Nazwa menu',
      type: 'string',
      description: 'np. "Główna", "Stopka", "Mobile"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identyfikator',
      type: 'slug',
      options: { source: 'nazwa' },
      description: 'Używane do pobierania menu w kodzie',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pozycje',
      title: 'Pozycje menu',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pozycjaMenu',
          title: 'Pozycja menu',
          fields: [
            defineField({
              name: 'etykieta',
              title: 'Etykieta (PL)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'etykietaEN',
              title: 'Etykieta (EN)',
              type: 'string',
            }),
            defineField({
              name: 'etykietaDE',
              title: 'Etykieta (DE)',
              type: 'string',
            }),
            defineField({
              name: 'typLinku',
              title: 'Typ linku',
              type: 'string',
              initialValue: 'internal',
              options: {
                list: [
                  { title: 'Wewnętrzny', value: 'internal' },
                  { title: 'Zewnętrzny', value: 'external' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
            defineField({
              name: 'href',
              title: 'Link (URL)',
              type: 'string',
              description: 'np. /wydarzenia lub https://...',
            }),
            defineField({
              name: 'otworzWNowymOknie',
              title: 'Otwórz w nowym oknie',
              type: 'boolean',
              initialValue: false,
              hidden: ({ parent }) => parent?.typLinku !== 'external',
            }),
            defineField({
              name: 'podpozycje',
              title: 'Podmenu',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'podpozycja',
                  fields: [
                    defineField({
                      name: 'etykieta',
                      title: 'Etykieta (PL)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'etykietaEN',
                      title: 'Etykieta (EN)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link (URL)',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: { title: 'etykieta', subtitle: 'href' },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'etykieta',
              href: 'href',
              podpozycje: 'podpozycje',
            },
            prepare({ title, href, podpozycje }) {
              const count = podpozycje?.length || 0
              return {
                title,
                subtitle: `${href || ''}${count > 0 ? ` • ${count} podpozycji` : ''}`,
              }
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'nazwa',
      pozycje: 'pozycje',
    },
    prepare({ title, pozycje }) {
      const count = pozycje?.length || 0
      return {
        title,
        subtitle: `${count} pozycji`,
      }
    },
  },
})
