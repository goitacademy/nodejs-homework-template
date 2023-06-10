# Node.js module

It's a REST API built to work with a collection of contacts.
To work with the REST API, I used Postman. For simple data validation I used Joi package https://joi.dev/
In the previous version I was working with JSON file. In this version I'm using MongoDB and Mongoose manage data.

### The REST API supports the following routes

GET /api/contacts
GET /api/contacts/:id
POST /api/contacts
DELETE /api/contacts/:id
PUT /api/contacts/:id

### Commands

- `npm start` &mdash; starts the server in production mode
- `npm run start:dev` &mdash; starts the server in developer mode
- `npm run lint` &mdash; runs a code check with ESLint
- `npm lint:fix` &mdash; runs a code check with ESLint and also automatically corrects simple errors

### Technologies

- JavaScript
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="30" height="30"/>
- Node.js
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" title="Node.js" alt="Node.js" width="60" height="60"/>
- MongoDB
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain-wordmark.svg" title="MongoDB" alt="MongoDB" width="30" height="30"/>
