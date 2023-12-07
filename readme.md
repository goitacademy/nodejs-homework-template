Sure, here is the translation of the text into English:

👉 [Links](./homework/Links.md)

# REST API

Five tasks are logically interconnected and involve writing a REST API.

### Requirements for completing homework assignments:

1. To complete the homework assignment, use the following [boilerplate](https://github.com/goitacademy/nodejs-homework-template).
2. A separate branch is created for each homework assignment:

   - hw02-express 👉 [HW-2](./homework/homework-02/README.ua.md) 👉 [Notes](./homework/homework-02/README.info.md)
   - hw03-mongodb 👉 [HW-3](./homework/homework-03/README.ua.md) 👉 [Notes](./homework/homework-03/README.info.md)
   - hw04-auth 👉 [HW-4](./homework/homework-04/README.ua.md) 👉 [Notes](./homework/homework-04/README.info.md)
   - hw05-avatars 👉 [HW-5](./homework/homework-05/README.ua.md) 👉 [Notes](./homework/homework-05/README.info.md)
   - hw06-email 👉 [HW-6](./homework/homework-06/README.ua.md) 👉 [Notes](./homework/homework-06/README.info.md)

3. Each new branch should be created from master.
4. JS code is clean and understandable; formatting is done using Prettier.
5. Before pushing, code quality is checked using the npm run lint command.
6. Code meets the technical requirements of the project.
7. No unhandled errors occur when the code is executed.
8. The names of variables, properties, and methods start with a lowercase letter and are written in CamelCase notation. English nouns are used.
9. The name of a function or method contains a verb.
10. The project works correctly with the current LTS version of Node.

### Commands:

- `npm start` &mdash; start the server in production mode.
- `npm run start:dev` &mdash; start the server in development mode.
- `npm run lint` &mdash; run code quality checks with eslint. This should be done before each PR and fix all linter errors.
- `npm run lint:fix` &mdash; the same linter check, but with automatic corrections of simple errors.
- `npm test` &mdash; start the server in test mode.

## REST API

### @ GET /api/contacts

- Receives nothing.
- Returns an array of all contacts in JSON format with status `200`.

### @ GET /api/contacts/:id

- Does not receive `body`.
- Receives `id` parameter.
- If such an `id` exists, returns the contact object in JSON format with status `200`.
- If such an `id` does not exist, returns JSON with the key `"message": "Not found"` and status `404`.

### @ POST /api/contacts

- Receives `body` in the format `{name, email, phone, favorite}` (name, email, phone are mandatory fields).
- If some mandatory fields are missing in `body`, returns JSON with the key `{"message": "missing required name field"}` and status `400`.
- If `favorite` is not specified in `body`, then when saving a new contact to the database, make the `favorite` field default to `false`.
- If everything is fine with `body`, adds a unique identifier to the contact object.
- Returns the object with the added `id` `{id, name, email, phone, favorite}` and status `201`.

### @ DELETE /api/contacts/:id

- Does not receive `body`.
- Receives `id` parameter.
- If such an `id` exists, returns JSON format `{"message": "contact deleted"}` and status `200`.
- If such an `id` does not exist, returns JSON with the key `"message": "Not found"` and status `404`.

### @ PUT /api/contacts/:id

- Receives `id` parameter.
- Receives `body` in JSON format with updates to any of the fields `name, email, and phone`.
- If there is no `body`, returns JSON with the key `{"message": "missing fields"}` and status `400`.
- Returns the updated contact object and status `200`. Otherwise, returns JSON with the key `"message": "Not found"` and status `404`.

### @ PATCH /api/contacts/:id/favorite

- Receives `contactId` parameter.
- Receives `body` in JSON format with an update to the `favorite` field.
- If there is no `body`, returns JSON

with the key `{ "message": "missing field favorite"}` and status `400`.

- Returns the updated contact object and status `200`. Otherwise, returns JSON with the key `"message": "Not found"` and status `404`.

### @ POST /api/users/register

- Receives `body` in the format `{email, password}` (email, password are mandatory fields).
- If some mandatory fields are missing in `body`, returns JSON with the key `{"message": "Missing required "..." field"}` and status `400`.
- If the `body` contains an `email` that already exists in the database, returns JSON with the key `{"message": "Email already in use!"}` and status `409`.
- If everything is fine with `body`, adds a unique identifier to the user object.
- Returns the object with the added `id` `{email, password}` and status `201`.

### @ POST /api/users/login

- Receives `body` in the format `{email, password}` (email, password are mandatory fields).
- If some mandatory fields are missing in `body`, returns JSON with the key `{"message": "Missing required "..." field"}` and status `400`.
- If the `body` contains `email` and `password` that do not match those in the database, returns JSON with the key `{"message": "Email or password is wrong!"}` and status `401`.
- If everything is fine with `body`, creates a token.
- Returns the object with the added `token` and `user={email, password}` and status `200`.

### @ POST /api/users/logout

- Receives a token in `Authorization: "Bearer {{token}}"`.
- If there is no user with such a token, returns JSON with the key `{"message": "Not authorized! User not found!"}` and status `401`.
- If the user is found, deletes the token.
- Returns status `204 No Content`.

### @ GET /api/users/current

- Receives a token in `Authorization: "Bearer {{token}}"`.
- If there is no user with such a token, returns JSON with the key `{"message": "Not authorized! User not found!"}` and status `401`.
- If the user is found, returns the object `{email, subscription}` with status `200`.

### @ GET /api/contacts?page=1&limit=20

Pagination for the contacts collection.

### @ GET /api/contacts?page=1&limit=20&favorite=true

Filtering contacts by the favorite field (GET /contacts?favorite=true).

### @ PATCH /api/users/:contactId/subscription

Updating a user's subscription.

- Receives a token in `Authorization: "Bearer {{token}}"`.
- Receives `body` in the format `{subscription}`. Subscription (the `{subscription}` field is mandatory) must have one of the following values ['starter', 'pro', 'business'].
- Returns the updated user object with status `200`. Otherwise, returns JSON with the key `"message": "Not found"` and status `404`.

### @ PATCH /api/users/avatars

Updating a user's avatar.

- Receives a token in `Authorization: "Bearer {{token}}"`.
- Receives a file in `body`.
- Returns the updated field (avatarURL) of the user object with status `200`.
- If the user is not authorized, returns JSON with the key `"message": "Not authorized"` and status `401`.

LINKS:  
👉 [Main Statuses — HTTP Response Codes](/homework/homework-02/README.info.md#main-statuses--http-response-codes)  
👉 [Unique Identifier Generators](/homework/homework-06/README.info.md#unique-identifier-generators)  
👉 [Multilingualism](/homework/homework-06/README.info.md#multilingualism)
