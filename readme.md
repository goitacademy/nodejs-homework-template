### Тестовий проект домашней работы:

Работа по REST API, с контактами в имитированную базу данных (db/contacts.json).

### Пример контакта:

- {
  - "id": "717d856c-7f12-49d2-b4be-0a203647314e",
  - "name": "Ahkiollk test",
  - "email": "nulluia.ante@vestibul.co",
  - "phone": "(292) 974-8880"
  - }

### REST API

1. (метод get) список всех контактов

- /api/contacts/

2. (метод get) информация о контакте по ID

- /api/contacts/:contactId

3. (метод post) добавление нового контакта с полями {name, email, phone}

- /api/contacts/:contactId

4. (метод delete) удаление контакта по ID

- /api/contacts/:contactId

5. (метод put) изменение контакта по ID (с переданными полями {name, email, phone})

- /api/contacts/:contactId

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок
