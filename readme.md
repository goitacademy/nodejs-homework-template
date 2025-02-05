## GoIT Node.js Course Template Homework

Wykonaj forka tego repozytorium, aby wykonywać zadania domowe (2-6). Fork utworzy repozytorium na Twoim koncie na http://github.com

Dodaj mentora jako collaboratora.

Dla każdego zadania domowego utwórz nową gałąź (branch).

- hw02
- hw03
- hw04
- hw05
- hw06

Każda nowa gałąź dla zadania powinna być tworzona z gałęzi master.

Po zakończeniu wykonania zadania domowego na swojej gałęzi, należy zrobić pull request (PR). Następnie dodaj mentora do przeglądu kodu. Dopiero po zatwierdzeniu PR przez mentora możesz scalić gałąź z zadaniem domowym do gałęzi master.

Uważnie czytaj komentarze mentora. Popraw uwagi i zrób commit na gałęzi z zadaniem domowym. Zmiany automatycznie pojawią się w PR po wysłaniu commitu z poprawkami na GitHub. Po poprawkach ponownie dodaj mentora do przeglądu kodu.

- Podczas oddawania zadania domowego podaj link do PR.
- Kod JS jest czytelny i zrozumiały, do formatowania używany jest Prettier.

### Komendy:

- `npm start` &mdash; uruchamia serwer w trybie produkcyjnym
- `npm run start:dev` &mdash; uruchamia serwer w trybie deweloperskim (development)
- `npm run lint` &mdash; uruchamia sprawdzanie kodu z ESLint, należy wykonać przed każdym PR i poprawić wszystkie błędy lintera
- `npm lint:fix` &mdash; to samo co powyższe, ale również automatycznie poprawia proste błędy.

Po uruchomieniu, poszczególne funkcje są dostępne przy wysyłaniu zapytań pod http://localhost:3000/api/auth lub http://localhost:3000/api/contacts.

### Dostępne zapytania:

`auth`:

- `GET /current` - zwraca kto jest obecnie zalogowany.
- `GET /verify/<verificationToken>` - weryfikuje użytkownika na podstawie tokenu weryfikacyjnego otrzymanego w mailu lub przechowywanego w bazie danych.
- `POST /verify` - wysyła ponownie maila na adres użytkownika, jeśli ten nie został jeszcze zautoryzowany.
- `POST /signup` - rejestruje użytkownika w bazie danych.
- `POST /login` - loguje użytkownika.
- `POST /logout` - pozwala wylogować użytkownika.
- `PATCH /update` - zmienia dane użytkownika.
- `PATCH /avatars` - pozwala zmienić avatar użytkownika.

`contacts`:

- `GET /` - zwraca listę kontaktów użytkownika.
- `GET /<id>` - zwraca informacje o wybranym kontakcie.
- `POST /` - dodaje kontakt do listy użytkownika.
- `DELETE /<id>` - usuwa wybrany kontakt.
- `PUT /<id>` - zmienia dane wybranego kontaktu.
- `PATCH /<id>/favourite` - zmienia status "Ulubiony" wybranego kontaktu.
