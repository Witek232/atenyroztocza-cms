import { defineType, defineField } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const youtubeEmbed = defineType({
  name: 'youtubeEmbed',
  title: 'Film YouTube',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'youtubeId',
      title: 'YouTube ID',
      type: 'string',
      description: 'np. dQw4w9WgXcQ (z URL: youtube.com/watch?v=dQw4w9WgXcQ)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Etykieta',
      type: 'string',
      description: 'np. "Część 1", "Wykład główny"',
    }),
    defineField({
      name: 'czas',
      title: 'Czas trwania',
      type: 'string',
      description: 'np. 45:30',
    }),
    defineField({
      name: 'opis',
      title: 'Opis części',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'startTime',
      title: 'Czas startu (sekundy)',
      type: 'number',
      description: 'Opcjonalnie: rozpocznij od konkretnego momentu',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      youtubeId: 'youtubeId',
      czas: 'czas',
    },
    prepare({ label, youtubeId, czas }) {
      return {
        title: label || youtubeId,
        subtitle: `${youtubeId}${czas ? ` • ${czas}` : ''}`,
      }
    },
  },
})
