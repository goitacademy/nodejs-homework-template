### Тестовий проект домашней работы:

Работа по REST API, с контактами в базе данных MongoDB ( db-contacts коллекция contacts).

### Пример контакта:

- {
  - "name": "Ahkiollk test",
  - "email": "nulluia.ante@vestibul.co",
  - "phone": "(292) 974-8880",
  - "favorite": false
  - }

### Пример регистрации нового пользователя:

- {
  - "name": "test",
  - "email": "test@gmail.com",
  - password: "password",
  - subscription: ["starter", "pro", "business"], default: "starter" },

}

### REST API CONTACTS

1. (метод get) список всех контактов

- /api/v1/contacts/

  - пагинация для коллекции списка контактов (по умолчанию page=1, limit=20)
  - фильтрация коллекции списка контактов по полю favorite=true или favorite=false по умолчанию выводяться все контакты независимо от favorite.

2. (метод get) информация о контакте по ID

- /api/v1/contacts/:contactId

3. (метод post) добавление нового контакта с полями {name, email, phone}

- /api/v1/contacts/:contactId

4. (метод delete) удаление контакта по ID

- /api/v1/contacts/:contactId

5. (метод put) изменение контакта по ID (с переданными полями {name, email, phone})

- /api/v1/contacts/:contactId

6. (метод patch) изменение статуса контакта по ID (с переданным boolean полем {favorite})

- /api/v1/contacts/:contactId/favorite

7. (метод get) список всех контактов с boolean полем {favorite})

- /api/v1/contacts?favorite=false или /api/v1/contacts?favorite=true

### REST API USERS

1. (метод post) регистрация нового пользователя

- /api/v1/users/signup

2. (метод post) логин входа пользователя в личный кабинет

- /api/v1/users/login

3. (метод post) разлогинить пользователя выйти из личного кабинета

- /api/v1/users/logout

4. (метод get) получить данные о текущем пользователе

- /api/v1/users/current

5. (метод patch) обновление поля "subscription", текущего пользователе из следующих возможных вариантов, ['starter', 'pro', 'business'] по умолчанию "starter"

- /api/v1/users/

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок
