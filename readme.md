# REST API for Contact Collection

This repository contains a RESTful API for managing a collection of contacts. The API is built using Node.js and Express, providing endpoints for performing CRUD operations on the contacts.
It uses MongoDB as the database for storing contact information. The API follows best practices and includes proper error handling, data validation using the Joi package, and integration with MongoDB using Mongoose. This project also implements user authentication and authorization using JSON Web Tokens (JWT), and user email verification using the SendGrid service. It provides endpoints for user registration, login, token verification middleware, user logout, pagination, filtration by favorites, and subscription update.

> This repository assumes the usage of Postman, a popular API development and testing tool, for interacting with the REST API.

### Endpoints

#### 1. GET /api/contacts

Retrieves contacts from user's collection with pagination support.

    Does not receive a body or parameters.
    Requires authentication (token in the Authorization header).
    Returns a paginated contact list in JSON format with a status code of 200 (OK).

##### GET /api/contacts?page=1&limit=5

Query parameters: - page - Specifies the page number to retrieve (default: 1). - limit - Specifies the maximum number of contacts to return per page (default: 10).

##### GET /api/contacts?favorite=true

Retrieves contacts filtered by favorites.
Query parameter: favorite=true

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

#### 6. PATCH /api/contacts/:id/favorite

Updates the favorite status of a contact.

    Receives the parameter id.
    Receives the body in JSON format with the update for the favorite field.
    If the body is missing, it returns JSON with the key {"message": "missing field favorite"} and a status code of 400 (Bad Request).
    Returns the updated contact object and a status code of 200 (OK) if the operation is successful, or JSON with the key {"message": "Not found"} and a status code of 404 if the specified id is not found.

#### 7. POST /api/users/register

Registers a new user.

    Receives the body in the format {name, email, password} where all fields are required.
    The "subscription" field is optional and can have the following values: "starter", "pro", or "business". It defaults to "starter" if not provided.
    If any of the required fields are missing in the body, it returns JSON with the key {"message": "missing required {field} field"} and a status code of 400 (Bad Request).
    If the provided email is already in use, it throws an error with a status code of 409 (Conflict) and the message "Email already in use".
    If all required fields are present in the body and the email is not already in use, it hashes the password using bcrypt, generates an avatar URL using Gravatar, generates a verification token using uuid, and creates a new user with the provided name, email, generated avatar, hashed password, and a verification token.
    If the user is successfully created and the verification email is sent, the API will return an object in the response with the following properties: name, email, subscription, avatarURL, and verificationToken, and a status code of 201 (Created).
    The API will send a verification email to the provided email address containing a link to verify the user's email.

#### 8. POST /api/users/login

Logs in a user with the provided email and password.

    Receives the body in the format {email, password} where both fields are required.
    If the provided email or password is incorrect, it throws an error with a status code of 401 (Unauthorized) and the message "Email or password is incorrect".
     If the user's email is not verified yet, it throws an error with a status code of 403 (Forbidden) and the message "Email is not verified".
    If the email and password are correct, it generates a JWT (JSON Web Token) using the user's ID as the payload and signs it with a secret key. The generated token has an expiration time of 23 hours.
    The generated token is then stored in the user's record in the database by updating the corresponding user document with the new token.
    Returns the generated token in the response body with a status code of 200 (OK).
    Additionally, the response will include the user's information such as name, email, subscription, and avatarURL.

#### 9. POST /api/users/logout

Logs out the currently logged-in user.

    Requires authentication (token in the Authorization header).
    Clears the token field of the user's record in the database by updating the corresponding user document.
    Returns a JSON response with a message indicating the successful logout, with a status code of 200 (OK).

#### 10. GET /api/users/current

Retrieves the information of the currently logged-in user.

    Requires authentication (token in the Authorization header).
    Returns the email and name of the currently logged-in user in JSON format with a status code of 200 (OK).
    If the user is not found, it returns an error with a status code of 401 (Unauthorized).

#### 11. PATCH /api/users

Updates the subscription of the currently logged-in user.

    Receives the body in the format { subscription } where the subscription field is required.
    Requires authentication (token in the Authorization header).
    Retrieves the user's document based on the user ID extracted from the token.
    If the user is not found, it returns an error with a status code of 401 (Unauthorized).
    Updates the user's subscription field with the provided subscription value.
    Returns a JSON response indicating that the subscription was updated successfully, with a status code of 200 (OK).

#### 12. PATCH /api/users/avatars

Updates the avatar of the currently logged-in user.

    Receives the body as multipart/form-data with the uploaded file.
    Requires authentication (token in the Authorization header).
    Saves the uploaded file to the "tmp" directory in the project root.
    Processes the avatar using the "jimp" package, resizing it to 250x250 pixels.
    Moves the user's avatar from the "tmp" directory to the "public/avatars" directory with a unique name for the specific user.
    Updates the user's avatarURL field with the URL of the processed avatar image.
    Returns a JSON response with the updated avatarURL and a status code of 200 (OK) if the operation is successful or JSON {"message": "Not authorized"} and a status code of 401 (Unauthorized) if the user is not authorized.

#### 13. GET /api/users/verify/:verificationToken

Verifies a user's email using the verification token.

    Received the verification token in the URL parameter.
    If a user with the provided verification token is found, the API updates the user's record in the database to mark the email as verified. The verification token will be set to null.
    Returns a message "Verification successful" with a status code of 200 (OK).

#### 14. POST /api/users/verify

Resends the verification email to a user's email address.

    Receives the required field email in the body.
    If a user with the email is found, and the user's email was already verified it throws an error with a message "Verification has already been passed" and a status code of 400 (Bad Request).
    If a user with the email is found, and the user's email was not verified the API will send a verification email to the provided email address.
    The verification email will contain a link for the user to click and verify their email. The link will include the verification token as a parameter.
    The API will return a JSON response with a message "Verification email sent" with a status code of 200 (OK).

### Validation

To ensure data integrity, the API performs validation on the incoming data using the Joi and Mongoose schema for models.

For adding a new contact:

    All fields (name, email, phone) are required.
    The email field must match the regular expression to ensure it is a valid email format.

For updating a contact:

    At least one field (name, email, phone) must be provided.
    If the data fails validation, JSON with the key {"message": "value must contain at least one of [name, email, phone]"} will be returned.

For user registration:

    All fields (name, email, phone) are required.
    The email must match the email regular expression.
    The password must have a minimum length of 6 characters.

For user login:

    The email field is required and must match the email regular expression.
    The password field is required and must have a minimum length of 6 characters.

For updating a user's subscription:

    The subscription field is required and must be one of the values: "starter", "pro", or "business".

## Dependencies

The API relies on the following dependencies:

- Node.js (runtime environment)
- Express.js (web framework)
- MongoDB (database)
- Mongoose (MongoDB object modeling)
- Joi (data validation)
- bcrypt.js (password hashing)
- jsonwebtoken (JWT generation and verification)
- multer (file upload handling)
- jimp (image processing)
- uuid (generating verification tokens)
- sendgrid/mail (sending verification emails)
