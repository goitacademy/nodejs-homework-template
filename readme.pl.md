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

- `npm start` &mdash;  uruchamia serwer w trybie produkcyjnym
- `npm run start:dev` &mdash; uruchamia serwer w trybie deweloperskim (development)
- `npm lint:fixnpm run lint` &mdash; uruchamia sprawdzanie kodu z ESLint, należy wykonać przed każdym PR i poprawić wszystkie błędy lintera
- `npm lint:fix` &mdash; to samo co powyższe, ale również automatycznie poprawia proste błędy.


GET:    http://localhost:3000/api/contacts/
GET:    http://localhost:3000/api/contacts/{id}             { "favorite": true }
POST:   http://localhost:3000/api/contacts/                 { "name": "mongo mongusek", "email": "piąty@contact.com", "phone": "555-555-555" }
PUT:    http://localhost:3000/api/contacts/{id}             { "name": "mongosek mongo", "email": "piąty@contact.com", "phone": "777-888-777" }
PUSCH:  http://localhost:3000/api/contacts/{id}/favorite    { "favorite": false/or/true }
DELETE: http://localhost:3000/api/contacts/{id}