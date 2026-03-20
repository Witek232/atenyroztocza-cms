import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'w2r65fb5',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'ateny-roztocza',
  autoUpdates: true,
})
