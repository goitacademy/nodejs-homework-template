ContactManager API is a Node.js-based service facilitating contact management.
This API allows operations on an address book, offering endpoints for listing, retrieving, adding, updating, and removing contacts.

Getting Started:

Clone the repository.
Run npm install to install dependencies.

Scripts:

npm start: Launches the application in production mode for contact management via the command-line interface.
npm run start:dev: Launches the application in development mode using nodemon for automatic code reloading.
npm run lint: Performs code checking with ESLint.
npm lint:fix: Same as above, automatically fixing simple errors.
Usage:

List Contacts

Path: /api/contacts
Method: GET
Status: 200 OK / 404 Not Found

Get Contact by ID

Path: /api/contacts/:contactId
Method: GET
URL Parameters: contactId - Contact ID
Status: 200 OK / 404 Not Found

Path: /api/contacts/
Method: POST
Request Body: JSON with new contact data
Status: 201 Created / 400 Bad Request - message "missing required field"

Update Contact

Path: /api/contacts/:contactId
Method: PUT
URL Parameters: contactId - Contact ID
Request Body: JSON with updated contact data
Status: 200 OK / 404 Not Found

Remove Contact

Path: /api/contacts/:contactId
Method: DELETE
URL Parameters: contactId - Contact ID
Status: 200 OK / 404 Not Found
