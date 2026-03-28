// Documents
import { ustawieniaStrony } from './documents/ustawieniaStrony'
import { nawigacja } from './documents/nawigacja'
import { wydarzenie } from './documents/wydarzenie'
import { galeria } from './documents/galeria'
import { materialAudiowizualny } from './documents/multimedia'
import { artykul } from './documents/artykul'
import { kategoria } from './documents/kategoria'

// Objects (reużywalne)
import { blockContent } from './objects/blockContent'
import { seo } from './objects/seo'
import { linkZewnetrzny } from './objects/link'
import { tlumaczenieTekstowe } from './objects/tlumaczenia'
import { zdjecieZPodpisem } from './objects/zdjecie'
import { youtubeEmbed } from './objects/youtube'

export const schemaTypes = [
  // Objects (muszą być pierwsze!)
  blockContent,
  seo,
  linkZewnetrzny,
  tlumaczenieTekstowe,
  zdjecieZPodpisem,
  youtubeEmbed,

  // Documents
  ustawieniaStrony,
  nawigacja,
  wydarzenie,
  galeria,
  materialAudiowizualny,
  artykul,
  kategoria,
]
