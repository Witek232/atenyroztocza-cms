# Ateny Roztocza - Sanity Studio

CMS dla strony Ateny Roztocza.

## 🚀 Uruchomienie

```bash
# Instalacja zależności
npm install

# Konfiguracja
cp .env.example .env.local
# Edytuj .env.local jeśli potrzeba

# Uruchomienie
npm run dev
```

Studio dostępne pod: http://localhost:3333

## 📁 Struktura projektu

```
├── src/
│   ├── schemaTypes/
│   │   ├── documents/      # Typy dokumentów
│   │   ├── objects/        # Reużywalne obiekty
│   │   └── index.ts        # Eksport wszystkich schematów
│   └── structure/          # Konfiguracja panelu
├── sanity.config.ts        # Główna konfiguracja
├── sanity.cli.ts           # Konfiguracja CLI
└── package.json
```

## 📦 Typy dokumentów

- **ustawieniaStrony** - Singleton z ustawieniami globalnymi
- **nawigacja** - Menu nawigacyjne
- **wydarzenie** - Wydarzenia i konferencje
- **galeria** - Albumy zdjęć
- **materialAudiowizualny** - Filmy YouTube
- **artykul** - Artykuły prasowe
- **kategoria** - Kategorie treści

## 🌐 Deployment

```bash
# Deploy do Sanity Hosting
npm run deploy
```

## 📚 Dokumentacja

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Studio v3](https://www.sanity.io/docs/sanity-studio)

## 🔑 Zmienne środowiskowe

| Zmienna | Opis |
|---------|------|
| SANITY_STUDIO_PROJECT_ID | ID projektu Sanity |
| SANITY_STUDIO_DATASET | Nazwa datasetu (production/staging) |
