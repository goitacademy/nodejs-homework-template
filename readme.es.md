Project Readme

Table of Contents
Introduction
Technologies
Getting Started
Usage
Project Status
Sources
Additional Information

----------------------------------------------

Introduction:
This project is a simple CRUD (Create, Read, Update, Delete) application for managing contacts. It utilizes a Node.js backend with Express, MongoDB as the database, and Mongoose as the ODM (Object Data Modeling) library. The project provides RESTful API endpoints to perform various operations on contacts, such as listing, adding, updating, and removing them.

----------------------------------------------

Technologies:
Node.js
Express
MongoDB
Mongoose
Joi (for input validation)

----------------------------------------------

Getting Started
To run this project locally, follow these steps:
1.Clone the repository to your local machine:
-git clone [repository_url]
2.Install the required dependencies:
-cd [project_directory]
-npm install
3.Set up the MongoDB database:
-Create a MongoDB Atlas account or use an existing one.
=Replace the connection string in the connectToDatabase.js file with your own MongoDB connection string.
4.Run the application:
-npm start

----------------------------------------------

Usage:
API Endpoints
List Contacts:

GET /api/contacts
Get Contact by ID:

GET /api/contacts/:id
Add Contact:

POST /api/contacts
Request body should include: { "name": "John Doe", "email": "john@example.com", "phone": "1234567890" }
Remove Contact:

DELETE /api/contacts/:id
Update Contact:

PUT /api/contacts/:id
Request body should include one or more of the following: { "name": "New Name", "email": "new.email@example.com", "phone": "9876543210" }
Update Contact Status (Favorite):

PATCH /api/contacts/:id/favorite
Request body should include: { "favorite": true } or { "favorite": false }

----------------------------------------------

Input Validation
Input validation is implemented using Joi. Invalid requests will receive a 400 Bad Request response with details on the validation error.