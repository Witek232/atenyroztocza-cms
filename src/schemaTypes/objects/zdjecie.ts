import { defineType, defineField } from 'sanity'

export const zdjecieZPodpisem = defineType({
  name: 'zdjecieZPodpisem',
  title: 'Zdjęcie z podpisem',
  type: 'object',
  fields: [
    defineField({
      name: 'plik',
      title: 'Zdjęcie',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Tekst alternatywny',
      type: 'string',
      description: 'Opis zdjęcia dla czytników ekranu',
    }),
    defineField({
      name: 'podpis',
      title: 'Podpis (PL)',
      type: 'string',
    }),
    defineField({
      name: 'podpisEN',
      title: 'Podpis (EN)',
      type: 'string',
    }),
    defineField({
      name: 'podpisDE',
      title: 'Podpis (DE)',
      type: 'string',
    }),
    defineField({
      name: 'autor',
      title: 'Autor zdjęcia',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'podpis',
      alt: 'alt',
      media: 'plik',
    },
    prepare({ title, alt, media }) {
      return {
        title: title || alt || 'Brak opisu',
        media,
      }
    },
  },
})
