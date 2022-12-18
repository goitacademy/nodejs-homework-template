# REST API Документація

## Ендпоінти для роботи з колекцією контактів

**Використовуйте наступні запити для перегляду та редагування облікових записів в базі даних:**

- Отримати список всіх контактів: `GET /api/contacts/`
- Отримати дані контакту:`GET /api/contacts/:id/`
- Додати новий контакт: `POST /api/contacts/`
- Оновити контакт: `PUT /api/contacts/:id/`
- Видалити контакт: `DELETE /api/contacts/:id/`
- Оновити статус контакту: `PATCH /api/contacts/:id/favorite/`

---

## Отримати список всіх контактів

**URL:** `/api/contacts/`

**Метод:** `GET`

### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту**

```json
[
   {
      "_id": "6393def55e1f48171bfecbe8",
      "name": "Abbot Franks",
      "email": "scelerisque@magnis.org",
      "phone": "+38 (099) 123-45-67",
      "favorite": true,
      "createdAt": "2022-12-14T22:59:45.126Z",
      "updatedAt": "2022-12-14T22:59:45.126Z"
   },
      ...,
   {
      ...,
   }
]
```

---

## [Отримати дані контакту](#GET_/api/contacts/:id)

**URL:** `/api/contacts/:id/`

**Метод:** `GET`

**Приклад вмісту запиту** для контакту з ідентифікатором `"_id" - "6393def55e1f48171bfecbe8"` в базі даних

### Успішна відповідь:

**Код:** `200 OK`

```json
{
  "_id": "6393def55e1f48171bfecbe8",
  "name": "Abbot Franks",
  "email": "scelerisque@magnis.org",
  "phone": "+38 (099) 123-45-67",
  "favorite": true,
  "createdAt": "2022-12-14T22:59:45.126Z",
  "updatedAt": "2022-12-14T22:59:45.126Z"
}
```

### Відповідь на помилку:

**Приклад відповіді:** для запиту контакта з ідентифікатором `"_id" - "6393def55e1f48171bfecbe"`, якого не існує в базі даних

**Код:** `404 Bad Request`

```json
   "message": "\"_id\" with value \"6393def55e1f48171bfecbe\" fails to match the valid mongo id pattern"
```

---

## Додати новий контакт

**URL:** `/api/contacts/`

**Метод:** `POST`

**Приклад вмісту:** для запиту з наступними даними

```json
{
  "name": "Chaim Lewis",
  "email": "dui.in@egetlacus.ca",
  "phone": "(294) 840-6685",
  "favorite": true
}
```

### Успішна відповідь:

**Код:** `201 Created`

```json
{
   "_id": "639e4965e5fd0304989402b3",
   "name": "Chaim Lewis",
   "email": "duy.in@egetlacus.ca",
   "phone": "(294) 840-6686",
   "favorite": true,
   "createdAt": "2022-12-17T22:57:41.582Z",
   "updatedAt": "2022-12-17T22:57:41.582Z"
}
```
*Примітка: при відсутності даних з полем "favorite" за замовчуванням "favorite" буде присвоєно "false".*

### Відповідь на помилку:

**Приклад вмісту** для запиту з наступними даними:

```json
{
   "name": "Chaim Lewis",
   "phone": "(294) 840-6685"
}
```

**Код:** `400 Bad Request`

**Приклад вмісту**

```json
   "message": "\"_id\" with value \"6393def55e1f48171bfecbe\" fails to match the valid mongo id pattern"
```
---
## Оновити дані контакту

**URL:** `/api/contacts/:id/`

**Метод:** `PUT`

**Приклад запиту:**

"\_id" - "6393def55e1f48171bfecbe8"

```json
{
   "name": "Thomas Franks",
   "email": "thomas_franks@gmail.com",
   "phone": "+38-096-765-43-21",
   "favorite": false
}
```

### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту** відображатиме оновлену інформацію контакту:

```json
{
   "_id": "6393def55e1f48171bfecbe8",
   "name": "Thomas Franks",
   "email": "thomas_franks@gmail.com",
   "phone": "+38-096-765-43-21",
   "favorite": false,
   "createdAt": "2022-12-14T22:59:45.126Z",
   "updatedAt": "2022-12-14T23:48:12.126Z"
}
```

Допускаються часткові дані:

```json
{
   "phone": "+38-096-765-43-21"
}
```

### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту** відображатиме оновлену інформацію контакту:

```json
{
   "_id": "6393def55e1f48171bfecbe8",
   "name": "Thomas Franks",
   "email": "thomas_franks@gmail.com",
   "phone": "+38-096-765-43-21",
   "favorite": false,
   "createdAt": "2022-12-14T22:59:45.126Z",
   "updatedAt": "2022-12-14T23:48:12.126Z"
}
```

### Відповідь на помилку

**Умова:** якщо надані недійсні дані, наприклад невалідне поле "email"

**Код:** `400 Bad Request`

**Приклад вмісту**

```json
{
   "message": "\"email\" must be a valid email"
}
```

---

## Видалити контакт

**URL:** `/api/contacts/:id/`

**Метод:** `DELETE`

**Приклад запиту:**

"\_id" - "639a5561e150fa0f00310f9f"

### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту:** відповідь відображатиме інформацію про видалення контакту

```json
"Contact by 'Id' - '639a5561e150fa0f00310f9f' deleted"
```

### Відповідь на помилку

**Приклад вмісту** якщо надані недійсні дані, наприклад неіснуючий "\_id":

**Код:** `404 Not Found`

```json
{
   "message": "Not Found"
}
```

---

## Оновити статус контакту

**URL:** `/api/contacts/:id/favorite`

**Метод:** `PATCH`

**Приклад запиту:**

"\_id" - "6393def55e1f48171bfecbe3"

```json
{
  "favorite": true
}
```

### Успішна відповідь:

**Код:** `200 OK`

**Приклад вмісту** відображатиме оновлену інформацію контакту:

```json
{
   "_id": "6393def55e1f48171bfecbe3",
   "name": "Allen Raymond",
   "email": "nulla.ante@vestibul.co.uk",
   "phone": "(992) 914-3792",
   "favorite": true,
   "createdAt": "2022-12-14T22:59:45.126Z",
   "updatedAt": "2022-13-14T23:48:12.126Z"
}
```

### Відповідь на помилку

**Приклад вмісту** якщо надані недійсні дані, наприклад відсутнє поле "favorite":

**Код:** `400 Bad Request`

```json
{
   "message": "Missing field favorite"
}
```

---
---
## Free

---
The code in this repository is not licensed in any way.

Do what you want, [Unlicense dot org](http://unlicense.org/), spread the word.

---
