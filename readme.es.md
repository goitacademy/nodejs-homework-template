# Project Readme

## Table of Contents 
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
    - [Cloning the Repository](#cloning-the-repository)
    - [Installing Dependencies](#installing-dependencies)
    - [Setting up MongoDB](#setting-up-mongodb)
    - [Running the Application](#running-the-application)
4. [User Authentication](#user-authentication)
    - [Signup](#signup)
    - [Login](#login)
    - [Logout](#logout)
    - [Current User](#current-user)
5. [User Email Verification](#user-email-verification)
    - [Verification Email](#verification-email)
    - [Verify Email Endpoint](#verify-email-endpoint)
    - [Resend Verification Email](#resend-verification-email)
6. [Usage](#usage)
    - [API Endpoints](#api-endpoints)
    - [Input Validation](#input-validation)
7. [Testing](#testing)

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

### Cloning the Repository
1. Clone the repository to your local machine:
    git clone [repository_url]
  

### Installing Dependencies
2. Install the required dependencies:
    cd [project_directory]
    npm install


### Setting up MongoDB
3. Set up the MongoDB database:
   - Create a MongoDB Atlas account or use an existing one.
   - Replace the connection string in the `connectToDatabase.js` file with your own MongoDB connection string.

### Running the Application
4. Run the application:
    npm start

## User Authentication
The application includes user authentication using JWT (JsonWebToken). Below are the endpoints related to user authentication:

### Signup
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

### Login
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

### Logout
- **Endpoint:**
  - `GET /api/logout`
- **Requires authentication:** Yes

### Current User
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

## User Email Verification

### Verification Email
After user registration, a verification email is sent to the provided email address. The email contains a unique verification link. The verification link structure is as follows:
http://yourapi.com/users/verify/:verificationToken


### Verify Email Endpoint
- **Endpoint:**
  - `GET /api/users/verify/:verificationToken`
- **Purpose:** Verify the user's email address using the verification token sent in the email.
- **Response:**
  - Success (200): `{ "message": "Verification successful" }`
  - User Not Found (404): `{ "message": "User not found" }`
  - Verification Already Passed (404): `{ "message": "Verification already passed" }`
- **Error Handling:**
  - Internal Server Error (500): `{ "message": "Internal Server Error" }`

### Resend Verification Email
In case the user did not receive the initial verification email or needs to resend it for any reason, there is an endpoint to resend the verification email.

- **Endpoint:**
  - `POST /api/users/verify`
- **Request body should include:**
  ```json
  {
    "email": "user@example.com"
  }

## Response

- **Verification Email Sent (200):** `{ "message": "Verification email sent" }`
- **User Not Found (404):** `{ "message": "User not found" }`
- **Verification Already Passed (400):** `{ "message": "Verification has already been passed" }`

## Error Handling

- **Missing Email Field (400):** `{ "message": "Missing required field email" }`
- **Internal Server Error (500):** `{ "message": "Internal Server Error" }`

## Usage

### API Endpoints

- **List Contacts:**
  - `GET /api/contacts`

- **Get Contact by ID:**
  - `GET /api/contacts/:id`

- **Add Contact:**
  - `POST /api/contacts`
  - *Request body should include:*
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
  - *Request body should include one or more of the following:*
    ```json
    {
      "name": "New Name",
      "email": "new.email@example.com",
      "phone": "9876543210"
    }
    ```

- **Update Contact Status (Favorite):**
  - `PATCH /api/contacts/:id/favorite`
  - *Request body should include:*
    ```json
    {
      "favorite": true
    }
    ```
    *or*
    ```json
    {
      "favorite": false
    }
    ```

- **Update Avatar**
  - **Endpoint:** `PATCH /api/avatars`
  - **Requires authentication:** Yes
  - *Request should be a form-data with a file field named "avatar".*
  - *Response includes:*
    ```json
    {
      "avatarURL": "/avatars/uniqueFileName.jpg"
    }
Input Validation
Input validation is implemented using Joi. Invalid requests will receive a 400 Bad Request response with details on the validation error.

Testing
To run tests, use the following command:
npm test