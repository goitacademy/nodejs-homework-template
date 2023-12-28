# REST API
Custom REST API created with Node.js to work with contacts. It uses basic REST methods like: GET, POST, DELETE and PUT.

>This REST API is a basis for bigger project. The repository will be developed in the future.

## Scripts

- `npm start`: starts the server in production mode
- `npm run start:dev`: starts the server in development mode using the nodemon tool, which enables automatic reloading of the application when changes are made in the code
- `npm run lint` — runs code checking with ESLint
- `npm lint:fix` — same as the above, but it also automatically fixes simple errors

## Usage

#### 1. Contacts list
Get a list of all the contacts.

- **Endpoint:** `/api/contacts`
- **Method:** GET

**Example response:**

```json
[
 {
    "id": "AeHIrLTr6JkxGE6SN-0Rw",
    "name": "Allen Raymond",
    "email": "nulla.ante@vestibul.co.uk",
    "phone": "(992) 914-3792"
  },
  {
    "id": "qdggE76Jtbfd9eWJHrssH",
    "name": "Chaim Lewis",
    "email": "dui.in@egetlacus.ca",
    "phone": "(294) 840-6685"
  },
  {
    "id": "drsAJ4SHPYqZeG-83QTVW",
    "name": "Kennedy Lane",
    "email": "mattis.Cras@nonenimMauris.net",
    "phone": "(542) 451-7038"
  }
]
```

### 2. Get Contact by ID
Get details of a specific contact based on its ID.

- **Endpoint:** `/api/contacts/:contactId`
- **Method:** GET

**Example response:**

```json
{
  "id": "rsKkOQUi80UsgVPCcLZZW",
  "name": "Alec Howard",
  "email": "Donec.elementum@scelerisquescelerisquedui.net",
  "phone": "(748) 206-2688"
}
```

### 3. Add New Contact
Add a new contact to the list.

- **Endpoint:** `/api/contacts/`
- **Method:** POST

**Example Request Body:**

```json
{
  "name": "test",
  "email": "test@example.com",
  "phone": "123456789"
}
```

### 4. Remove Contact
Delete a specific contact based on its ID.

- **Endpoint:** `/api/contacts/:contactId`
- **Method:** DELETE

**Example response:**

message: `contact deleted`

### 5. Update Contact
It gives us 2 options: update existing contact based on ID or create a new one.

1. `create new contact` - if ID won't be provided in endpoint, it will create new contact
- **Endpoint:** `/api/contacts/`
- **Method:** PUT

```json
{
  "id": "fFas123jvh141G2CG9HVj",
  "name": "new test1",
  "email": "newtest1@example.com",
  "phone": "123456789"
}
```

2. `update contact` - first, please provide ID. Then provide updated contact name, email or phone number. It will change contact data without changing ID.
- **Endpoint:** `/api/contacts/:contactId`
- **Method:** PUT

```json
{
  "id": "fFas123jvh141G2CG9HVj",
  "name": "new test1v2",
  "email": "newtest1v2@example.com",
  "phone": "123456789"
}
```



