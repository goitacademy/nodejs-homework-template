REST API for Contacts

Introduction:

Postman was utilized for interacting with the REST API. Connection to MongoDB was established using Mongoose.

The API supports the following routes:

GET /api/contacts
GET /api/contacts/:id
POST /api/contacts
DELETE /api/contacts/:id
PUT /api/contacts/:id
PATCH /api/contacts/:contactId/favorite
GET /api/contacts?page=1&limit=20 for pagination.
GET /api/contacts?favorite=true for filtering by favorite contacts.
PATCH /api/users/update-subscription to update the user's subscription.
For routes that accept data (POST and PUT), data validation has been implemented using the joi package.

Strategy used: Single Action Controller.

Technologies:

JavaScript
Node.js
Starting up:

First, install all required dependencies:

bash
Copy code
npm install
To run the application, use the following command:

bash
Copy code
npm start
The application will be accessible at localhost:3000.

Project Structure:

Author:

Michał Szczepański

Email: michalszczepanski07@gmail.com
GitHub: https://github.com/szczepanskimichal
LinkedIn: www.linkedin.com/in/michal-szczepanski-a2bb9126b
