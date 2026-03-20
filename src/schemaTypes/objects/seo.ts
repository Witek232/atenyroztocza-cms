import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTytul',
      title: 'Meta tytuł (PL)',
      type: 'string',
      description: 'Tytuł wyświetlany w wynikach wyszukiwania (50-60 znaków)',
      validation: (rule) => rule.max(60).warning('Zalecane max 60 znaków'),
    }),
    defineField({
      name: 'metaOpis',
      title: 'Meta opis (PL)',
      type: 'text',
      rows: 2,
      description: 'Opis wyświetlany w wynikach wyszukiwania (150-160 znaków)',
      validation: (rule) => rule.max(160).warning('Zalecane max 160 znaków'),
    }),
    defineField({
      name: 'metaTytulEN',
      title: 'Meta tytuł (EN)',
      type: 'string',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'metaOpisEN',
      title: 'Meta opis (EN)',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Zdjęcie OG (social media)',
      type: 'image',
      description: 'Zdjęcie wyświetlane przy udostępnianiu (1200x630 px)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Ukryj w wyszukiwarkach',
      type: 'boolean',
      description: 'Jeśli włączone, strona nie pojawi się w Google',
      initialValue: false,
    }),
  ],
})
