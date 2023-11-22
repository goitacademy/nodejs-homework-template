# Project Readme

## Table of Contents 
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
4. [Usage](#User Authentication)(#usage)
5. [Testing](#testing)
6. [Project Status](#project-status)
7. [Sources](#sources)
8. [Additional Information](#additional-information)

## Introduction
This project is a simple CRUD (Create, Read, Update, Delete) application for managing contacts. It utilizes a Node.js backend with Express, MongoDB as the database, and Mongoose as the ODM (Object Data Modeling) library. The project provides RESTful API endpoints to perform various operations on contacts, such as listing, adding, updating, and removing them.

## Technologies
- Node.js
- Express
- MongoDB
- Mongoose
- Joi (for input validation)
- Bcrypt (for password hashing)
- JsonWebToken (JWT) for user authentication

## Getting Started
To run this project locally, follow these steps:

1. Clone the repository to your local machine:
    git clone [repository_url]
    

2. Install the required dependencies:
    cd [project_directory]
    npm install
 

3. Set up the MongoDB database:
   - Create a MongoDB Atlas account or use an existing one.
   - Replace the connection string in the `connectToDatabase.js` file with your own MongoDB connection string.

4. Run the application:
    npm start


 ### User Authentication
The application includes user authentication using JWT (JsonWebToken). Below are the endpoints related to user authentication:

#### Signup
- **Endpoint:**
  - `POST /api/signup`
- **Request body should include:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
- **Response includes:**
    ```json
    {
      "user": {
        "email": "user@example.com",
        "subscription": "starter"
      }
    }
    ```

#### Login
- **Endpoint:**
  - `POST /api/login`
- **Request body should include:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
- **Response includes:**
    ```json
    {
      "token": "generated_jwt_token",
      "user": {
        "email": "user@example.com",
        "subscription": "starter"
      }
    }
    ```

#### Logout
- **Endpoint:**
  - `GET /api/logout`
- **Requires authentication:** Yes

#### Current User
- **Endpoint:**
  - `GET /api/current`
- **Requires authentication:** Yes
- **Response includes:**
    ```json
    {
      "email": "user@example.com",
      "subscription": "starter"
    }
    ```


## Usage
### API Endpoints
- **List Contacts:**
  - `GET /api/contacts`

- **Get Contact by ID:**
  - `GET /api/contacts/:id`

- **Add Contact:**
  - `POST /api/contacts`
  - Request body should include:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890"
    }
    ```

- **Remove Contact:**
  - `DELETE /api/contacts/:id`

- **Update Contact:**
  - `PUT /api/contacts/:id`
  - Request body should include one or more of the following:
    ```json
    {
      "name": "New Name",
      "email": "new.email@example.com",
      "phone": "9876543210"
    }
    ```

- **Update Contact Status (Favorite):**
  - `PATCH /api/contacts/:id/favorite`
  - Request body should include:
    ```json
    {
      "favorite": true
    }
    ```
    or
    ```json
    {
      "favorite": false
    }
    ```

### Input Validation
Input validation is implemented using Joi. Invalid requests will receive a 400 Bad Request response with details on the validation error.

## Testing
To run tests, use the following command:
```bash
npm test
