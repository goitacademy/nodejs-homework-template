# Node.js Phonebook

## Comands:

- `npm start` &mdash; server start in production mode
- `npm run start:dev` &mdash; start the server in development mode
- `npm run lint` &mdash; run a code check run with eslint, must run before each PR and fix all linter errors
- `npm lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors
 
# https://contacts-ttnw.onrender.com/ - API base URL

## User:

- ##### POST /api/auth/register - Create a new user
- ###### *Request body {"name": "string", "email": "string", "password": "string"} 
- ###### Responses: 201 User created. 409 User already exists. 500 Server error.
 
- ##### POST /api/auth/login - Login user
- ###### *Request body {"email": "string", "password": "string"}
- ###### Responses: 200	User is logged in. 401 Email or password invalid/Email is not verified. 500 Server error.
 
- ##### POST /api/auth/logout - Log out user
- ###### *Authorization header required (The token issued to the current user)
- ###### Responses: 200	Logout success. 401 Unauthorized. 500 Server error.
 
- ##### GET /api/auth/current - Get information about the current user
- ###### *Authorization header required (The token issued to the current user)
- ###### Responses: 200	OK. 401 Unauthorized. 500 Server error.
 

- ##### PATCH /api/auth/subscription - Change user subscription
- ###### *Authorization header required (The token issued to the current user) & Request body { "subscription": ["starter", "pro", "business"] }
- ###### Responses: 200	Subscription success changed. 400 Missing field. 401 Unauthorized. 500 Server error.
 
- ##### PATCH /api/users/avatars - Change user avatar
- ###### *Authorization header required (The token issued to the current user) & Request file { "avatar": picture } 
- ###### Responses: 200	Avatar changed. 401 Unauthorized. 500 Server error.

## Contact:

### *Authorization header required (The token issued to the current user)

- ##### GET /api/contacts - Get all user contacts
- ###### Responses: 200 Contacts found. 401 Unauthorized. 500 Server error.
 
- ##### GET /api/contacts/{contactId} - Get user contact by ID
- ###### Responses: 200 Contact found. 401 Unauthorized. 500 Server error.
 
- ##### POST /api/contacts - Create a new contact
- ###### *Request body {"name": "string","email": "string", "number": "string"}
- ###### Responses: 201 Contact created. 400 Missing field. 401 Unauthorized. 500 Server error.
 
- ##### PUT /api/contacts/{contactId} - Update an existing contact
- ###### *Request body {"name": "string","number": "string"}
- ###### Responses: 200 Contact changed. 400 Missing field. 401 Unauthorized. 500 Server error.
 
- ##### DELETE /api/contacts/{contactId} - Delete contact.
- ###### Responses: 200 Contact deleted. 401 Unauthorized. 500 Server error.
 
- ##### PATCH /api/{contactId}/favorite - Add or remove a contact from favorites
- ###### *Request body { "favorite": boolean }
- ###### Responses: 200 Contact changed. 400 Missing field. 401 Unauthorized. 500 Server error.


## Verify:

- ##### GET /api/verify/{verificationCode} - Verify by email (After successful registration, user will receive an email with a link to the following URL)
-  ###### Responses: 200 Email has been successfully verified. 404 Not found. 500 Server error.
 
- ##### POST /api/verify - Resend the verification link to email
- ###### *Request body { "email": "string" }
- ###### Responses: 200 Email has been successfully verified. 400 Verification has already been passed. 404 Email not found. 500 Server error.

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
