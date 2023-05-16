# REST API for Contact Collection

This repository contains a RESTful API for managing a collection of contacts. The API is built using Node.js and Express, providing endpoints for performing CRUD operations on the contacts.
It follows best practices and includes proper error handling, validation of incoming data using the Joi package, and the use of middleware packages such as Morgan for logging and CORS for handling cross-origin resource sharing.

> This repository assumes the usage of Postman, a popular API development and testing tool, for interacting with the REST API.

[TOC]

## Homework 2 - Express

### Endpoints

#### 1. GET /api/contacts

Retrieves all contacts in the collection.

    Does not receive a body or parameters.
    Returns an array of all contacts in JSON format with a status code of 200 (OK).

#### 2. GET /api/contacts/:id

Retrieves a specific contact by its ID.

    Does not receive a body.
    Receives the parameter id.
    If the specified id exists, returns the contact object in JSON format with a status code of 200 (OK).
    If the specified id does not exist, returns JSON with the key "message" set to "Not found" and a status code of 404.

#### 3. POST /api/contacts

Adds a new contact to the collection.

    Receives the body in the format {name, email, phone} where all fields are required.
    If any of the required fields are missing in the body, it returns JSON with the key {"message": "missing required name field"} and a status code of 400 (Bad Request).
    If all required fields are present in the body, it adds a unique identifier to the contact object.
    Returns an object with the added id {id, name, email, phone} and a status code of 201 (Created).

#### 4. DELETE /api/contacts/:id

Deletes a contact from the collection.

    Does not receive a body.
    Receives the parameter id.
    If the specified id exists, returns JSON in the format {"message": "contact deleted"} with a status code of 200 (OK).
    If the specified id does not exist, returns JSON with the key {"message": "Not found"} and a status code of 404.

#### 5. PUT /api/contacts/:id

Updates a contact's information.

    Receives the parameter id.
    Receives the body in JSON format with updates for any of the fields name, email, or phone.
    If the body is missing, it returns JSON with the key {"message": "missing fields"} and a status code of 400 (Bad Request).
    Returns the updated contact object and a status code of 200 (OK) if the operation is successful, or JSON with the key {"message": "Not found"} and a status code of 404 if the specified id is not found.

### Validation

To ensure data integrity, the API performs validation on the incoming data. The validation rules are as follows:

    When adding a new contact (POST), all fields (name, email, phone) are required.
    When updating a contact (PUT), at least one field (name, email, phone) must be provided.
    If the data fails validation, JSON with the key {"message": "value must contain at least one of [name, email, phone]"} will be returned.
