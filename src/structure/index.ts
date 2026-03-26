import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  MenuIcon,
  CalendarIcon,
  ImagesIcon,
  PlayIcon,
  DocumentTextIcon,
  TagIcon,
} from '@sanity/icons'

// Lista singletonów - dokumenty z jedną instancją
export const singletonTypes = new Set(['ustawieniaStrony'])

// Akcje niedostępne dla singletonów
export const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Ateny Roztocza')
    .items([
      // === USTAWIENIA (Singleton) ===
      S.listItem()
        .title('Ustawienia strony')
        .icon(CogIcon)
        .id('ustawieniaStrony')
        .child(
          S.document()
            .schemaType('ustawieniaStrony')
            .documentId('ustawieniaStrony')
            .title('Ustawienia strony')
        ),

      S.divider(),

      // === NAWIGACJA ===
      S.listItem()
        .title('Menu nawigacji')
        .icon(MenuIcon)
        .child(
          S.documentTypeList('nawigacja')
            .title('Menu nawigacji')
            .defaultOrdering([{ field: 'nazwa', direction: 'asc' }])
        ),

      S.divider(),

      // === GŁÓWNE TREŚCI ===
      S.listItem()
        .title('Wydarzenia')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('wydarzenia')
            .title('Wydarzenia')
            .defaultOrdering([{ field: 'data', direction: 'desc' }])
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('wydarzenie')
            )
        ),

      S.listItem()
        .title('Galeria — albumy')
        .icon(ImagesIcon)
        .child(
          S.documentTypeList('galeria')
            .title('Galeria')
            .defaultOrdering([{ field: 'rok', direction: 'desc' }])
        ),

      S.listItem()
        .title('Multimedia')
        .icon(PlayIcon)
        .child(
          S.documentTypeList('materialAudiowizualny')
            .title('Multimedia')
            .defaultOrdering([{ field: 'data', direction: 'desc' }])
        ),

      S.listItem()
        .title('Artykuły prasowe')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('artykul')
            .title('Artykuły prasowe')
            .defaultOrdering([{ field: 'data', direction: 'desc' }])
        ),

      S.divider(),

      // === TAKSONOMIA ===
      S.listItem()
        .title('Kategorie')
        .icon(TagIcon)
        .child(
          S.documentTypeList('kategoria')
            .title('Kategorie')
            .defaultOrdering([{ field: 'nazwa', direction: 'asc' }])
        ),
    ])
