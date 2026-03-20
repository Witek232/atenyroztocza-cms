import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/schemaTypes'
import { structure, singletonTypes } from './src/structure'

export default defineConfig({
  name: 'ateny-roztocza',
  title: 'Ateny Roztocza',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'w2r65fb5',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemaTypes,
    // Ukryj singletony z "Create new document"
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Zablokuj tworzenie nowych singletonów
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => !singletonTypes.has(templateItem.templateId)
        )
      }
      return prev
    },
    // Zablokuj duplikowanie i usuwanie singletonów
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(
          ({ action }) => 
            action && !['unpublish', 'delete', 'duplicate'].includes(action)
        )
      }
      return prev
    },
  },
})
