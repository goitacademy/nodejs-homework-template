# Node.js Phonebook

## Comands:

- `npm start` &mdash; server start in production mode
- `npm run start:dev` &mdash; start the server in development mode
- `npm run lint` &mdash; run a code check run with eslint, must run before each PR and fix all linter errors
- `npm lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors
 
# https://contacts-ttnw.onrender.com/ - API base URL

## User:

- ##### POST /api/auth/register - Create a new user
- ###### *Request body {"name": "Dwight Schrute", "email": "string", "password": "string"} 
 
- ##### POST /api/auth/login - Login user
- ###### *Request body {"email": "string", "password": "string"}
 
- ##### POST /api/auth/logout - Log out user
- ###### *Authorization header required (The token issued to the current user)
 
- ##### GET /api/auth/current - Get information about the current user
- ###### *Authorization header required (The token issued to the current user)
 

- ##### PATCH /api/auth/subscription - Change user subscription
- ###### *Authorization header required (The token issued to the current user) & Request body { "subscription": ["starter", "pro", "business"] }
 
- ##### PATCH /api/users/avatars - Change user avatar
- ###### *Authorization header required (The token issued to the current user) & Request file { "avatar": picture } 

## Contact:

### *Authorization header required (The token issued to the current user)

- ##### GET /api/contacts - Get all user contacts
 
- ##### GET /api/contacts/{contactId} - Get user contact by ID
 
- ##### POST /api/contacts - Create a new contact
- ###### *Request body {"name": "Pam Beesly","number": "761-23-96"}
 
- ##### PUT /api/contacts/{contactId} - Update an existing contact
- ###### *Request body {"name": "Pam Beesly","number": "761-23-96"}
 
- ##### DELETE /api/contacts/{contactId} - Delete contact.
 
- ##### PATCH /api/{contactId}/favorite - Add or remove a contact from favorites
- ###### *Request body { "favorite": boolean }


## Verify:

- ##### GET /api/verify/{verificationCode} - Verify by email (After successful registration, user will receive an email with a link to the following URL)
 
- ##### POST /api/verify - Resend the verification link to email
- ###### *Request body { "email": "string" }

## Schemas:

##### User
###### {
###### id	string
###### Backend-generated unique identifier.

###### avatar picture
###### An avatar is created automatically upon registration.

###### name*	string
###### Username.

###### email*	string
###### E-mail address.

###### password*	string
###### Password.

###### subscription string 
###### ["starter", "pro", "business"],
###### default: "starter",
}
 
###### * - required
###### example: OrderedMap { "name": "Adrian Cross", "email": "across@mail.com", "password": "examplepwd12345" }
 

##### Contact
###### {
###### id	string
###### Backend-generated unique identifier.

###### name*	string
###### Contact name.

###### number*	string
###### Phone number of the contact.
###### }
 
###### * - required
###### example: OrderedMap { "name": "Jacob Mercer", "number": "761-23-96" }

 
###### * - required
###### example: OrderedMap { "name": "Jacob Mercer", "number": "761-23-96" }

