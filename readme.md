## CLI додаток REST API Contacts (NodeJS, Express, MongoDB)

Для створення серверної частини програми використовувався один із способів,який полягає у застосуванні зв'язків з Node.js, фреймворку Express та документоорієнтована СУБД MongoDB.
Розроблений скелет серверної частини програми для створення колекції контактів. При цьому з контактами можна буде виконувати всі чотири CRUD-дії, а саме – створення (create), читання (read), оновлення (update) та видалення (delete).

- [Як встановити програму](#install)
- [REST API](#rest-api)
- [Маршрути контактів](#contacts)
  - [List of contacts](#get-list-of-contacts)
  - [Contact by Id](#get-contact-by-id)
  - [Create](#create-contact)
  - [Update](#update-contact)
  - [Update favorite field](#update-contact-favorite-field)
  - [Delete](#delete-contact)
- [Параметри запиту для маршрутів контактів](#query-params-for-contacts-list)
- [Маршрути користувачів](#users)
  - [Registration/Регістрація](#user-registration)
  - [Login/Логінізація](#user-login)
  - [Logout/Вийти](#user-logout)
  - [Current user/Поточний користувач](#get-current-user)
  - [Update Subscription/Оновлення підписки](#update-user-subscription)
  - [Update Avatar/Оновлення аватара](#update-user-avatar)

## Install Як встановити програму

- `npm install`;

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

## REST API для роботи з колекцією контактів

Для роботи з REST API використовуй [Postman] (https://www.getpostman.com/).

## List of contacts

### get-list-of-contacts

@ GET /api/contacts

- нічого не отримує
- викликає функцію listContacts для роботи з json-файлом contacts.json
- повертає масив всіх контактів в json-форматі зі статусом 200

Body: "contacts": []

### get-contact-by-id

@ GET /api/contacts/:id

- Не отримує body
- Отримує параметр id
- викликає функцію getById для роботи з json-файлом contacts.json
  якщо такий id є, повертає об'єкт контакту в json-форматі зі статусом 200
  якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404

Body: "contact": { "favorite": boolean, "\_id": string, "name": string, "email": string, "phone": string, "owner": object }

### create-contact

@ POST /api/contacts

- Отримує body в форматі {name, email, phone} (усі поля обов'язкові)
- Якщо в body немає якихось обов'язкових полів, повертає json з ключем {"message": "missing required name field"} і статусом 400
- Якщо з body все добре, додає унікальний ідентифікатор в об'єкт контакту
- Викликає функцію addContact(body) для збереження контакту в файлі contacts.json
- За результатом роботи функції повертає об'єкт з доданим id {id, name, email, phone} і статусом 201

#### validation

 - name: string,alphanum(min(3)max(30)),обов'язкове поле;
 - phone:string, length-11, pattern(/^\d{1}-\d{3}-\d{2}-\d{2}$/)
"phone number must be in format 1-111-11-11" обов'язкове поле;
 - email: string,minDomainSegments(кількість сегментів, необхідних для домену):2, ["com", "net"] , обов'язкове поле;

#### Request

Body: { "name": string, "email": string, "phone": string }

#### Response

Body: "contact": { "favorite": boolean, "\_id": string, "name": string, "email": string, "phone": string, "owner": object, "\_v": number }

### delete-contact

@ DELETE /api/contacts/:id

- Не отримує body
- Отримує параметр id
- Викликає функцію removeContact для роботи з json-файлом contacts.json
- якщо такий id є, повертає json формату {"message": "contact deleted"} і статусом 200
  якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404

### update-contact

@ PUT /api/contacts/:id

- Отримує параметр id
- Отримує body в json-форматі c оновленням будь-яких полів name, email и phone
- Якщо body немає, повертає json з ключем {"message": "missing fields"} і статусом 400
- Якщо з body всі добре, викликає функцію updateContact(contactId, body). (Напиши її) для поновлення контакту в файлі contacts.json
- За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем "message": "Not found" і статусом 404

#### Request

Body: { "favorite": boolean }

#### Response

Body: "contact": { "favorite": boolean, "\_id": string, "name": string, "email": string, "phone": string, "owner": object, "\_v": number }

#### validation

- name: string,alphanum(min(3)max(30)),обов'язкове поле;
- phone:string, length-11, pattern(/^\d{1}-\d{3}-\d{2}-\d{2}$/)
"phone number must be in format 1-111-11-11" обов'язкове поле;
- email: string,minDomainSegments(кількість сегментів, необхідних для домену):2, ["com", "net"] , обов'язкове поле;

@ PATCH / api / contacts /: contactId / favorite

- Отримує параметр contactId
- Отримує body в json-форматі c оновленням поля favorite
- Якщо body немає, повертає json з ключем {"message": "missing field favorite"}і статусом 400
- Якщо з body все добре, викликає функцію updateStatusContact (contactId, body) (напиши її) для поновлення контакту в базі
- За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем " message ":" Not found " і статусом 404

#### Request

Body: { "favorite": boolean }

#### Response

Body: "contact": { "favorite": boolean, "\_id": string, "name": string, "email": string, "phone": string, "owner": object, "\_v": number }

#### validation

- name: string,alphanum(min(3)max(30)),обов'язкове поле;
- phone:string, length-11, pattern(/^\d{1}-\d{3}-\d{2}-\d{2}$/)
"phone number must be in format 1-111-11-11" обов'язкове поле;
- email: string,minDomainSegments(кількість сегментів, необхідних для домену):2, ["com", "net"] , обов'язкове поле;
- favorite: boolean, default-false;

### Requests

`GET /api/contacts?page=1`

`GET /api/contacts?limit=20`

`GET /api/contacts?favorite=true`

`GET /api/contacts?sortBy=name`

`GET /api/contacts?sortByDesc=name`

`GET /api/contacts?filter=email`

# Users

## User Registration

@ POST / api / users / signup

#### Registration request

    POST /users/register
    Content-Type: application/json
    RequestBody: {
    "email": "example@example.com",
    "password": "examplepassword"
        }

#### Registration success response

    Status: 201 Created
    Content-Type: application/json
    ResponseBody: {
    "user": {
    "email": "example@example.com",
    "subscription": "starter"
    }
    }

#### userValidation

- password: string, min(6)max(12),обов'язкове поле;
- email: string,minDomainSegments(кількість сегментів, необхідних для домену):2, ["com", "net"] , обов'язкове поле;

## User Login

@ GET /users/login

### Request

    Content-Type: application/json
    RequestBody: {
    "email": "example@example.com",
    "password": "examplepassword"
    }

### Login success response

    Status: 200 OK
    Content-Type: application/json
    ResponseBody: {
    "token": "exampletoken",
    "user": {
    "email": "example@example.com",
    "subscription": "starter"
    }
    }

#### userValidation

- password: string, min(6)max(12),обов'язкове поле;
- email: string,minDomainSegments(кількість сегментів, необхідних для домену):2, ["com", "net"] , обов'язкове поле;

## User Logout

@ POST / api / users / logout

### Request

    POST /users/logout
    Authorization: "Bearer {{token}}"

### Logout success response

    Status: 204 No Content

## Get Current User

@ GET / api / users / current

### Request

    Authorization: "Bearer {{token}}"

### Current user success response

    Status: 200 OK
    Content-Type: application/json
    ResponseBody: {
    "email": "example@example.com",
    "subscription": "starter"
    }

## Update User Subscription

@ PATCH / api / users / subscription

### Request

    Authorization: Bearer
    Body: { "subscription": ['starter', 'pro', 'business'], }

### Response

    HTTP/1.1 200 OK
    Status: updated
    Content-Type: application/json

    Body: { "user": { "email": string, "subscription": string } }

### userValidationSubscript

- subscription: valid("starter", "pro", "business"),обов'язкове поле;

## Update User Avatar

@ PATCH / api / users / avatars

### Request

    Content-Type: multipart/form-data
    Authorization: "Bearer {{token}}"
    RequestBody: завантажений файл

### Response

    Status: 200 OK
    Content-Type: application/json
    ResponseBody: {
    "avatarURL": "тут буде посилання на зображення"
    }

