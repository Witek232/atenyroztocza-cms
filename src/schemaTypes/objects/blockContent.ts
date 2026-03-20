import { defineType, defineArrayMember } from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      title: 'Block',
      styles: [
        { title: 'Normalny', value: 'normal' },
        { title: 'Nagłówek 2', value: 'h2' },
        { title: 'Nagłówek 3', value: 'h3' },
        { title: 'Nagłówek 4', value: 'h4' },
        { title: 'Cytat', value: 'blockquote' },
      ],
      lists: [
        { title: 'Lista punktowana', value: 'bullet' },
        { title: 'Lista numerowana', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Pogrubienie', value: 'strong' },
          { title: 'Kursywa', value: 'em' },
          { title: 'Podkreślenie', value: 'underline' },
          { title: 'Przekreślenie', value: 'strike-through' },
          { title: 'Kod', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (rule) =>
                  rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Otwórz w nowym oknie',
                initialValue: false,
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Link wewnętrzny',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Dokument',
                to: [
                  { type: 'wydarzenie' },
                  { type: 'artykul' },
                  { type: 'galeria' },
                  { type: 'materialAudiowizualny' },
                ],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Zdjęcie',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Tekst alternatywny',
          description: 'Ważne dla dostępności i SEO',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Podpis',
        },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'youtubeVideo',
      title: 'Film YouTube',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'URL filmu YouTube',
        },
      ],
      preview: {
        select: { url: 'url' },
        prepare({ url }) {
          return {
            title: 'YouTube Video',
            subtitle: url,
          }
        },
      },
    }),
  ],
})
