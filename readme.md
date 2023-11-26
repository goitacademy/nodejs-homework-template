# Contacts REST API

Contacts REST API to prosta aplikacja Node.js oparta na MongoDB, która pozwala na modyfikację listy kontaktów za pomocą żądań HTTP. Jest to część kursu GoIT, na którym uczyłem się Node.js i narzędzi z nim związanych.

## Funkcje

- Dodawanie nowego kontaktu
- Wyświetlanie listy wszystkich kontaktów
- Wyświetlanie szczegółów konkretnego kontaktu
- Aktualizacja kontaktu
- Usuwanie kontaktu

## Instalacja

1. Sklonuj repozytorium na swoje lokalne środowisko.
2. Zainstaluj zależności za pomocą `npm install`.
3. Uruchom serwer w trybie deweloperskim za pomocą `npm run start:dev`.

## Użycie

### Wyświetlanie listy wszystkich kontaktów

Wyślij żądanie GET na `/api/contacts`.

### Dodawanie nowego kontaktu

Wyślij żądanie POST na `/api/contacts` z JSON zawierającym `name`, `email` i `phone`.

### Wyświetlanie szczegółów konkretnego kontaktu

Wyślij żądanie GET na `/api/contacts/:id`.

### Aktualizacja kontaktu

Wyślij żądanie PATCH na `/api/contacts/:id` z JSON zawierającym pola do zaktualizowania.

### Usuwanie kontaktu

Wyślij żądanie DELETE na `/api/contacts/:id`.

## Komendy

- `npm start` — uruchamia serwer w trybie produkcyjnym
- `npm run start:dev` — uruchamia serwer w trybie deweloperskim (development)
- `npm run lint` — uruchamia sprawdzanie kodu z ESLint, należy wykonać przed każdym PR i poprawić wszystkie błędy lintera
- `npm run lint:fix` — to samo co powyższe, ale również automatycznie poprawia proste błędy
