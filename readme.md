## GoIT Node.js Course Homework

-Overview

This app serves as an API for adding phone contacts along with the possibility to edit them or change their status.
The data is stored using MongoDB.

### API

# Get all contacts: `GET` /api/contacts/

- Parameters: No parameters
- Media type: application/json
- Response example value:

```javascript
[
  {
    _id: "62a86a9b3fc333ef2a601319",
    name: "Allen Raymond",
    email: "nulla.ante@vestibul.co.uk",
    phone: "(992) 914-3792",
    favorite: false,
  },
  {
    _id: "62a86a9b3fc333ef2a60131a",
    name: "Chaim Lewis",
    email: "dui.in@egetlacus.ca",
    phone: "(294) 840-6685",
    favorite: true,
  },
];
```

# Get one contact: `GET` /api/contacts/`:contactId`

- Parameters: `contactId`
- Media type: application/json
- Response example value:

```javascript
{
  "\_id": "62a86a9b3fc333ef2a601319",
  "name": "Allen Raymond",
  "email": "nulla.ante@vestibul.co.uk",
  "phone": "(992) 914-3792",
  "favorite": false
  }
```

# Add contact `POST` /api/contacts/

- Parameters: `body` -
  ```javascript
  {
  "name": "Allen Raymond", <=== `required`
  "email": "nulla.ante@vestibul.co.uk", <=== `required`
  "phone": "(992) 914-3792", <=== `required`
  "favorite": false <=== `(if not included in request, default parameter will be `false`)`
  }
  ```
- Media type: aplication/json
- Response example value:

```javascript
  {
  "\_id": "62a86a9b3fc333ef2a601319",
  "name": "Allen Raymond",
  "email": "nulla.ante@vestibul.co.uk",
  "phone": "(992) 914-3792",
  "favorite": false
  }
```

# Remove contact `DELETE` /api/contacts/`:contactId`

- Parameters: `contactId`
- Media type: application/json
- Response example value:

```javascript
  {
  "message": "contact deleted"
  }
```

# Edit contact `PUT` /api/contacts/`:contactId`

- Parameters: `contactId`, `body` -

```javascript
  {
  "name": "Ajax Poly", <=== `required`
  "email": "nulla.ante@vestibul.co.uk", <=== `required`
  "phone": "(992) 914-3792", <=== `required`
  "favorite": false <=== `(if not included in request, default parameter will be `false`)`
  }
```

- Media type: application/json
- Response example value:

```javascript
  {
  "\_id": "62a86a9b3fc333ef2a601319",
  "name": "Ajax Poly",
  "email": "nulla.ante@vestibul.co.uk",
  "phone": "(992) 914-3792",
  "favorite": false
  }
```

# Update contact status `PATCH` /api/contacts/`:contactId`/favorite

- Parameters: `contactId`, `body` -

```javascript
  {
  "favorite": true <=== `required`
  }
```

- Media type: application/json
- Response example value:

```javascript
  {
  "\_id": "62a86a9b3fc333ef2a601319",
  "name": "Ajax Poly",
  "email": "nulla.ante@vestibul.co.uk",
  "phone": "(992) 914-3792",
  "favorite": true <=== `As a response you will get an object with updated status "favorite"`
  }
```

### Scripts:

- `npm start` &mdash; start server in "production" mode;
- `npm run start:dev` &mdash; start server in "development" mode;
- `npm run lint` &mdash; run code verification with eslint, must be performed before each PR and correct all linter errors;
- `npm lint:fix` &mdash; same code verification but with automatic correction simple errors;

```

```
