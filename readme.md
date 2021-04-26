## Contacts REST-API

### Endpoints

- GET **api/contacts** - get all contacts
- GET **api/contacts/:contactId** - get one contact by id
- POST **api/contacts** - add contact, required body:
  ```
  {
    "name": String!,
    "email": String!,
    "phone": String!,
    "favorite": Boolean
  }
  ```
- DELETE **api/contacts/:contactId** - remove contact by id
- PATCH **api/contacts/:contactID/favorite** - update contact favorite,required
  body:
  ```
  {
    "favorite": Boolean!
  }
  ```
- PUT **api/contacts** - update contact, required body:
  ```
  {
    "name": String,
    "email": String,
    "phone": String,
    "favorite": Boolean
  }
  ```

### Команды:

- `npm start` &mdash; start in production mode
- `npm run start:dev` &mdash; start in development mode
- `npm run lint` &mdash; eslint
- `npm lint:fix` &mdash; eslint + fix
