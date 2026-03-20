import { defineType, defineField } from 'sanity'

export const tlumaczenieTekstowe = defineType({
  name: 'tlumaczenieTekstowe',
  title: 'Tłumaczenie tekstowe',
  type: 'object',
  fields: [
    defineField({
      name: 'pl',
      title: 'Polski',
      type: 'string',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
    defineField({
      name: 'de',
      title: 'Deutsch',
      type: 'string',
    }),
    defineField({
      name: 'es',
      title: 'Español',
      type: 'string',
    }),
    defineField({
      name: 'it',
      title: 'Italiano',
      type: 'string',
    }),
  ],
})
