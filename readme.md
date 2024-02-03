REST API for Contacts
This REST API is designed for managing a set of contacts. It utilizes Node.js and MongoDB, with the connection established using Mongoose. The API supports the following routes:

GET /api/contacts: Retrieve all contacts.
GET /api/contacts/:id: Retrieve a specific contact by ID.
POST /api/contacts: Create a new contact.
DELETE /api/contacts/:id: Delete a contact by ID.
PUT /api/contacts/:id: Update a contact by ID.
PATCH /api/contacts/:contactId/favorite: Update the favorite status of a contact.
For routes that involve data manipulation (POST and PUT), input data validation is implemented using the joi package.

Technologies Used
JavaScript
Node.js
MongoDB (with Mongoose)
Getting Started
To set up the project, start by installing the required dependencies:

bash
Copy code
npm install
Next, run the application using the following command:

bash
Copy code
npm start
The application will be accessible at http://localhost:3000.

Project Structure
The project is organized using the Single Action Controller strategy for better maintainability and readability.

Project Structure
scss
Copy code
project-root-directory
│ README.md
│ .gitignore
│ ... (other project files)
│  
└───src
│ │ app.js
│ │ ... (other source files)
│  
└───controllers
│ │ ... (controllers files)
│  
└───models
│ │ ... (model files)
│  
└───routes
│ │ ... (route files)
│  
└───middlewares
│ ... (middleware files)
Author
Michal Szczepanski

Email: michalszczepanski07@gmail.com
GitHub: szczepanskimichal
LinkedIn: Michal Szczepanski
Feel free to reach out for any questions or collaboration opportunities.
