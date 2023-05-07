> ### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

---

<br>
<br>

> ### User:

`POST` /api/users/register - Створити нового користувача. Відправляємо body в форматі JSON. Мінімальна кількість символів пароля 6. На вказаний email приходить лист з посиланням для верифікації пошти.

```json
{
  "name": "User Name",
  "email": "usertest@usermail.com",
  "password": "123456"
}
```

<br>
<br>

`POST` /api/users/login - Увійти. Відправляємо body в форматі JSON. Якщо email не верифікований увійти не можливо.

```json
{
  "email": "usertest@usermail.com",
  "password": "123456"
}
```

<br>
<br>

`POST` /api/users/logout - Вийти з системи: потрібно прикріпити заголовок `authorization: Bearer token`
<br>
<br>

`GET` /api/users/current - Отримати інформацію про поточного користувача: потрібно прикріпити заголовок `authorization: Bearer token`
<br>
<br>

`PATCH` /api/users/avatars - Оновити аватарку користувача: потрібно прикріпити заголовок `authorization: Bearer token` та body в форматі form-data передати ключ `avatar` та файл. Доступні формати .png .jpg .jpeg.
<br>
<br>

`PATCH` /api/users/subscription - Оновити підписку користувача: потрібно прикріпити заголовок `authorization: Bearer token` та body в форматі JSON. доступні підписки 'starter'- за замовчуванням, 'pro', 'business'

```json
{
  "subscription": "business"
}
```

<br>
<br>

`GET` /api/users/verify:verificationToken - Верифікація користувача: якщо все добре приходить відповідь.

```json
{
  "message": "Verification successful",
  "user": {
    "name": "user name",
    "email": "usertest@usermail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGJkMmZlNGM4YzU2M2MwNjM3YjU2YyIsImlhdCI6MTY4MjY5MTExMSwiZXhwIjoxNjgyNzczOTExfQ.wQ2j6gqEgEbZbrPz9aNrkuKROT2NjZSAfUjWzhszIjc"
}
```

<br>
<br>

`PATCH` /api/users/verify - повторно відправити листа для верифікації: потрібно прикріпити body в форматі JSON.

```json
{
  "email": "usertest@usermail.com"
}
```

---

<br>
<br>

> ### Contact:

> приватні шляхи для роботи потрібно прикріпити заголовок `authorization: Bearer token`

<br>
<br>

`GET` /api/contacts - отримати всі контакти. По замовчуванню відає 1 сторінку та 10 контактів.

`параметри запиту:`

приклад: `api/contacts?page=1&limit=10&favorite=true`

- page=1 - сторінка
- limit=10 - кількість контактів на сторінку
- favorite= false або true - для отримання всіх контактів favorite вказувати не потрібно.
  <br>
  <br>

`GET` /api/contacts/`{contactId}` - отримати контакт по id
<br>
<br>

`POST` /api/contacts - створення нового контакту відправляємо body в форматі JSON

```json
{
  "name": "My Name",
  "email": "test@test.com",
  "phone": "(294) 840-6685",
  "favorite": false
}
```

<br>
<br>

`PUT` /api/contacts/`{contactId}` - оновлення контакту відправляємо body в форматі JSON.
"favorite" не є обов'язковим можна не відправляти за замовчуванням буде встановлено false.

```json
{
  "name": "My Name",
  "email": "test@test.com",
  "phone": "(294) 840-6685",
  "favorite": false
}
```

<br>
<br>

`PATCH` /api/contacts/`{contactId}`/favorit - оновлення поля контакту "favorite" відправляємо body в форматі JSON.

```json
{
  "favorite": true
}
```

<br>
<br>

`DELETE` /api/contacts/`{contactId}` - видалення контакту
