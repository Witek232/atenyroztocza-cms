import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const ustawieniaStrony = defineType({
  name: 'ustawieniaStrony',
  title: 'Ustawienia strony',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'Ogólne', default: true },
    { name: 'contact', title: 'Kontakt' },
    { name: 'social', title: 'Social Media' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // === OGÓLNE ===
    defineField({
      name: 'tytulStrony',
      title: 'Tytuł strony',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
      description: 'Ikona w pasku przeglądarki (32x32 px)',
    }),

    // === KONTAKT ===
    defineField({
      name: 'emailKontaktowy',
      title: 'Email kontaktowy',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'telefon',
      title: 'Telefon',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'adres',
      title: 'Adres',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'mapaUrl',
      title: 'Link do Google Maps',
      type: 'url',
      group: 'contact',
    }),

    // === SOCIAL MEDIA ===
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter/X URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    }),

    // === SEO ===
    defineField({
      name: 'opisStrony',
      title: 'Opis strony (meta description)',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'slowaKluczowe',
      title: 'Słowa kluczowe',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Domyślne zdjęcie OG (social media)',
      type: 'image',
      group: 'seo',
      description: 'Zalecany rozmiar: 1200x630 px',
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      group: 'seo',
      description: 'np. G-XXXXXXXXXX',
    }),
  ],

  preview: {
    select: {
      title: 'tytulStrony',
      media: 'logo',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Ustawienia strony',
        subtitle: 'Konfiguracja globalna',
        media,
      }
    },
  },
})
