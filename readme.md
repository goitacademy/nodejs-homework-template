# GoIT Node.js Homework

This is a homework project on Node.js for GOIT.
The project contains a REST API for working with a collection of contacts. [Postman](https://www.getpostman.com/) was used to work with the REST API.

## API Reference

#### Get all contacts

```http
  GET /api/contacts
```

#### Get contact

```http
  GET /api/contacts/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of contact to fetch |

#### Add contact

```http
  POST /api/contacts
```

| Parameter | Type   | Description                          |
| :-------- | :----- | :----------------------------------- |
| `body`    | `JSON` | **Required**. Body of contact to add |

#### Delete contact

```http
  DELETE /api/contacts/${id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. Id of contact to delete |

#### Change contact

```http
  PUT /api/contacts/${id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. Id of contact to change |

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
