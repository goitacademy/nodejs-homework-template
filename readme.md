# Backend for ContactApp (Node.js)

`http://localhost:3000/api/users`

| Method | URL       | Params                                   | Descriptoin              |
| ------ | --------- | ---------------------------------------- | ------------------------ |
| post   | /register | name, email, password, subscription type | user`s registration      |
| post   | login     | email, password                          | log in to system         |
| post   | /logout   |                                          | log out from system      |
| get    | /current  |                                          | ?                        |
| patch  | /         |                                          | update subscription type |

`http://localhost:3000/api/contacts`

| Method | URL         | Params                              | Descriptoin                            |
| ------ | ----------- | ----------------------------------- | -------------------------------------- |
| get    | /           |                                     | get all user`s contacts                |
| get    | /:contactId |                                     | get info about specific user`s contact |
| post   | /           | name, phone number, email, favorite | add contact                            |
| delete | /:contactId |                                     | delete specific contact                |
| put    | /:contactId | validateBody(schemas.updateSchema), | update specific contact                |

## Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
