Написати REST API для роботи з колекцією контактів. Для роботи з REST API використовуй [Postman](https://www.getpostman.com/).

Прочитай уважно readme в клонованому темплейті, там описаний механізм здачі домашніх завдань. Та починай виконувати ДЗ.

# Критерії прийому дз # 2-6

- Створено репозиторій з домашнім завданням — REST API додаток
- При створенні репозиторія використаний [бойлерплейт](https://github.com/goitacademy/nodejs-homework-template)
- Пулл-реквест (PR) з відповідним дз відправлений менторові на перевірку (посилання на PR)
- Код відповідає технічному завданню проекта
- При виконанні коду не виникає необроблених помилок
- Назва змінних, властивостей і методів починається з малої літери і записуються в нотації CamelCase. Використовуються англійські іменники
- Назва функції або методу містить дієслово
- У коді немає закоментованих ділянок коду
- Проект коректно працює з актуальною LTS-версією Node

## Крок 1

Створи гілку `hw02-express` з гілки `master`.

Встанови командою пакети

```
npm i
```

Такі пакети є в проекті:

- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [cors](https://www.npmjs.com/package/cors)

## Крок 2

У `app.js` - веб сервер на `express` і прошарки `morgan` і `cors`. Почни налаштовувати раутінг для роботи з колекцією контактів.

REST API повинен підтримувати такі раути.

@ GET /api/contacts

- нічого не отримує
- викликає функцію `listContacts` для роботи з json-файлом `contacts.json`
- повертає масив всіх контактів в json-форматі зі статусом `200`

@ GET /api/contacts/:id

- Не отримує `body`
- Отримує параметр `id`
- викликає функцію `getById` для роботи з json-файлом `contacts.json`
- якщо такий `id` є, повертає об'єкт контакту в json-форматі зі статусом `200`
- якщо такого `id` немає, повертає json з ключем `"message": "Not found"` і статусом `404`

@ POST /api/contacts

- Отримує `body` в форматі `{name, email, phone}` (усі поля обов'язкові)
- Якщо в `body` немає якихось обов'язкових полів, повертає json з ключем `{"message": "missing required name field"}` і статусом `400`
- Якщо з `body` все добре, додає унікальний ідентифікатор в об'єкт контакту
- Викликає функцію `addContact(body)` для збереження контакту в файлі `contacts.json`
- За результатом роботи функції повертає об'єкт з доданим `id` `{id, name, email, phone}` і статусом `201`

@ DELETE /api/contacts/:id

- Не отримує `body`
- Отримує параметр `id`
- Викликає функцію `removeContact` для роботи з json-файлом `contacts.json`
- якщо такий `id` є, повертає json формату `{"message": "contact deleted"}` і статусом `200`
- якщо такого `id` немає, повертає json з ключем `"message": "Not found"` і статусом `404`

@ PUT /api/contacts/:id

- Отримує параметр `id`
- Отримує body в json-форматі c оновленням будь-яких полів `name, email и phone`
- Якщо `body` немає, повертає json з ключем `{"message": "missing fields"}` і статусом `400`
- Якщо з `body` все добре, викликає функцію `updateContact(contactId, body)`. (Напиши її) для поновлення контакту в файлі `contacts.json`
- За результатом роботи функції повертає оновлений об'єкт контакту і статусом `200`. В іншому випадку, повертає json з ключем `"message": "Not found"` і статусом `404`

## Крок 3

Для маршрутів, що приймають дані (`POST` та `PUT`), продумайте перевірку (валідацію) отриманих даних. Для валідації прийнятих даних використовуйте пакет [joi](https://github.com/sideway/joi)

# ДЗ #3

Створи гілку `03-mongodb` з гілки `master`.

Продовж створення REST API для роботи з колекцією контактів.

## Крок 1

Створи аккаунт на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Після чого в акаунті створи новий проект і налаштуй безкоштовний кластер. Під час налаштування кластера вибери провайдера і регіон як на скріншоті нижче. Якщо вибрати занадто віддалений регіон, швидкість відповіді сервера буде довше.

## Крок 2

Встанови графічний редактор [MongoDB Compass](https://www.mongodb.com/download-center/compass) для зручної роботи з базою даних для MongoDB. Налаштуй підключення своєї хмарної бази даних до Compass. У MongoDB Atlas не забудь створити користувача з правами адміністратора.

## Крок 3

Через Compass створи базу даних `db-contacts` і в ній колекцію `contacts`. Візьми [посилання на json](https://github.com/goitacademy/nodejs-homework/blob/master/homework-03/contacts.json) і за допомогою Compass наповни колекцію `contacts` (зроби імпорт) його вмістом.

Якщо ви все зробили правильно, дані повинні з'явитися у вашій базі в колекції `contacts`

## Крок 4

Використовуй вихідний код домашньої работи #2 і заміни зберігання контактів з json-файлу на створену тобою базу даних.

- Напиши код для створення підключення до MongoDB за допомогою [Mongoose](https://mongoosejs.com/).
- При успішному підключенні виведи в консоль повідомлення `"Database connection successful"`.
- Обов'язково обробив помилку підключення. Виведи в консоль повідомлення помилки і заверши процес використовуючи `process.exit(1)`.
- У функціях обробки запитів заміни код CRUD-операцій над контактами з файлу, на Mongoose-методи для роботи з колекцією контактів в базі даних.

Схема моделі для колекції `contacts`:

```
{
name: {
type: String,
required: [true, 'Set name for contact'],
},
email: {
type: String,
},
phone: {
type: String,
},
favorite: {
type: Boolean,
default: false,
},
}
```

## Крок 5

У нас з'явилося в контактах додаткове поле статусу `favorite`, яке приймає логічне значення `true` або `false`. Воно відповідає за те, що в обраному чи ні знаходиться зазначений контакт. Потрібно реалізувати для оновлення статусу контакту новий роутер

## @ PATCH / api / contacts /: contactId / favorite

- Отримує параметр `contactId`
- Отримує `body` в json-форматі c оновленням поля `favorite`
- Якщо `body` немає, повертає json з ключем `{"message": "missing field favorite"}` і статусом `400`
- Якщо з `body` все добре, викликає функцію `updateStatusContact (contactId, body)` (напиши її) для поновлення контакту в базі
- За результатом роботи функції повертає оновлений об'єкт контакту і статусом `200`. В іншому випадку, повертає json з ключем `" message ":" Not found "` і статусом `404`

# ДЗ #4

Створи гілку `04-auth` з гілки `master`.

Продовж створення REST API для роботи з колекцією контактів. Додай логіку аутентифікації / авторизації користувача через [JWT](https://jwt.io/).

## Крок 1

У коді створи схему і модель користувача для колекції `users`.

```
{
password: {
type: String,
required: [true, 'Set password for user'],
},
email: {
type: String,
required: [true, 'Email is required'],
unique: true,
},
subscription: {
type: String,
enum: ["starter", "pro", "business"],
default: "starter"
},
token: String
}
```

Змініть схему контактів, щоб кожен користувач бачив тільки свої контакти. Для цього в схемі контактів додайте властивість:

```
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
```

Примітка: `'user'` - назва колекції, у якій зберігаються користувачі

## Крок 2

Реєстрація
Створити ендпоінт `/users/register`

Зробити валідацію всіх обов'язкових полів (email і password). При помилці валідації повернути Помилку валідації.

У разі успішної валідації в моделі `User` створити користувача за даними, які пройшли валідацію. Для засолювання паролів використовуй [bcrypt](https://www.npmjs.com/package/bcrypt) або [bcryptjs](https://www.npmjs.com/package/bcryptjs)

- Якщо пошта вже використовується кимось іншим, повернути Помилку Conflict.
- В іншому випадку повернути Успішна відповідь.

#### Registration request

```
POST /users/register
Content-Type: application/json
RequestBody: {
"email": "example@example.com",
"password": "examplepassword"
}
```

#### Registration validation error

```
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
```

#### Registration conflict error

```
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
"message": "Email in use"
}
```

#### Registration success response

```
Status: 201 Created
Content-Type: application/json
ResponseBody: {
"user": {
"email": "example@example.com",
"subscription": "starter"
}
}
```

## Логін

Створити ендпоінт `/users/login`

В моделі `User` знайти користувача за `email`.

Зробити валідацію всіх обов'язкових полів (email і password). При помилці валідації повернути Помилку валідації.

- В іншому випадку, порівняти пароль для знайденого користувача, якщо паролі збігаються створити токен, зберегти в поточному юзера і повернути Успішна відповідь.
- Якщо пароль або імейл невірний, повернути Помилку Unauthorized.

#### Login request

```
POST /users/login
Content-Type: application/json
RequestBody: {
"email": "example@example.com",
"password": "examplepassword"
}
```

#### Login validation error

```
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
```

#### Login success response

```
Status: 200 OK
Content-Type: application/json
ResponseBody: {
"token": "exampletoken",
"user": {
"email": "example@example.com",
"subscription": "starter"
}
}
```

#### Login auth error

```
Status: 401 Unauthorized
ResponseBody: {
"message": "Email or password is wrong"
}
```

## Крок 3

### Перевірка токена

Створи мідлвар для перевірки токена і додай його до всіх раутів, які повинні бути захищені.

- Мідлвар бере токен з заголовків `Authorization`, перевіряє токен на валідність.
- У випадку помилки повернути Помилку Unauthorized.
- Якщо валідація пройшла успішно, отримати з токена `id` користувача. Знайти користувача в базі даних з цим `id`.
- Якщо користувач існує і токен збігається з тим, що знаходиться в базі, записати його дані в `req.user` і викликати `next()`.
- Якщо користувача з таким `id` НЕ існує або токени не збігаються, повернути Помилку Unauthorized

#### Middleware unauthorized error

```
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}
```

## Крок 4

### Логаут

Створити ендпоінт `/users/logout`

Додай в маршрут мідлвар перевірки токена.

- У моделі `User` знайти користувача за `_id`.
- Якщо користувача не існує повернути Помилку Unauthorized.
- В іншому випадку, видалити токен у поточного юзера і повернути Успішна відповідь.

#### Logout request

```
POST /users/logout
Authorization: "Bearer {{token}}"
```

#### Logout unauthorized error

```
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}
```

#### Logout success response

```
Status: 204 No Content
```

## Крок 5

### Поточний користувач - отримати дані юзера по токені

Створити ендпоінт `/users/current`

Додай в раут мідлвар перевірки токена.

- Якщо користувача не існує повернути Помилку Unauthorized
- В іншому випадку повернути Успішну відповідь

#### Current user request

```
GET /users/current
Authorization: "Bearer {{token}}"
```

#### Current user unauthorized error

```
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}
```

#### Current user success response

```
Status: 200 OK
Content-Type: application/json
ResponseBody: {
"email": "example@example.com",
"subscription": "starter"
}
```

## Додаткове завдання - необов'язкове

- Зробити пагінацію для колекції контактів (GET /contacts?page=1&limit=20).
- Зробити фільтрацію контактів по полю обраного (GET /contacts?favorite=true)
- Оновлення підписки (`subscription`) користувача через ендпоінт `PATCH` `/users`. Підписка повинна мати одне з наступних значень `['starter', 'pro', 'business']`

# ДЗ #5

Створи гілку `hw05-avatars` з гілки `master`.

Продовж створення REST API для роботи з колекцією контактів. Додай можливість завантаження аватарки користувача через [Multer](https://github.com/expressjs/multer).

## Крок 1

Створи папку `public` для роздачі статики. У цій папці зроби папку `avatars`. Налаштуй Express на роздачу статичних файлів з папки `public`.

Поклади будь-яке зображення в папку `public/avatars` і перевір, що роздача статики працює. При переході по такому URL браузер відобразить зображення.

`Shell http://locahost:<порт>/avatars/<ім'я файлу з розширенням> `

## Крок 2

У схему користувача додай нову властивість `avatarURL` для зберігання зображення.

```
{
...
avatarURL: String,
...
}
```

Використовуй пакет [gravatar](https://www.npmjs.com/package/gravatar) для того, щоб при реєстрації нового користувача відразу згенерувати йому аватар по його `email`.

## Крок 3

При реєстрації користувача:

- Створюй посилання на аватарку користувача за допомогою [gravatar](https://www.npmjs.com/package/gravatar)
- Отриманий URL збережи в поле `avatarURL` під час створення користувача

## Крок 4

Додай можливість поновлення аватарки, створивши ендпоінт `/users/avatars` і використовуючи метод `PATCH`.

```
# Запит

PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: завантажений файл

# Успішна відповідь

Status: 200 OK
Content-Type: application/json
ResponseBody: {
"avatarURL": "тут буде посилання на зображення"
}

# Неуспішна відповідь

Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}
```

- Створи папку `tmp` в корені проекту і зберігай в неї завантажену аватарку.
- Оброби аватарку пакетом [jimp](https://www.npmjs.com/package/jimp) і постав для неї розміри 250 на 250
- Перенеси аватарку користувача з папки `tmp` в папку `public/avatars` і дай їй унікальне ім'я для конкретного користувача.
- Отриманий `URL` `/avatars/<ім'я файлу з розширенням>` та збережи в поле `avatarURL` користувача

## Додаткове завдання - необов'язкове

### Написати unit-тести для контролера входу (логін)

За допомогою [Jest](https://jestjs.io/ru/docs/getting-started)

- відповідь повина мати статус-код 200
- у відповіді повинен повертатися токен
- у відповіді повинен повертатися об'єкт `user` з 2 полями `email` i `subscription` з типом даних `String`
