# CRUD APP REST API

Backend App with contacts management and user handling.

## Features

### Contact Management:

- Create, read, update and delete contacts.
- Mark contacts as favourites.

### User Management:

- User registration and login.
- Email verification during registration, requiring users to click a verification link sent to their email address to activate their account.
- Update user subscription data.
- User logout.
- Retrieve data of the currently logged-in user.
- Assigning an initial avatar to each user upon registration, with the option for users to update their avatar later.
- Capability for users to manage and update their own profiles, including personal information and avatar changes.

## Technologies

- Node.js with Express.js for the backend, providing a robust framework for building efficient and scalable server-side applications.
- Mongoose for MongoDB interaction, facilitating object data modeling and database interaction in an asynchronous environment.
- Passport.js for authentication and JWT (JSON Web Tokens) handling, offering a flexible and modular approach to handling user authentication and secure token generation.
- SendGrid for handling email operations, crucial for features like sending verification emails during user registration. This adds a layer of security and user verification to the application.
- CORS (Cross-Origin Resource Sharing) enabled, ensuring the API can securely handle requests from different domain origins.
- Dotenv for managing environment variables, allowing easy configuration of the application in different environments without code changes.
- Docker, with a custom Dockerfile created for the application, enabling easy deployment and environment consistency by containerizing the application. This facilitates smoother development, testing, and production workflows.

## API Usage

Once the server is running, the API is available at http://localhost:3000. Available endpoints:

#### Contacts:

- GET /contacts - retrieves a list of contacts.
- GET /contacts/:id - retrieves a specific contact by ID.
- POST /contacts - creates a new contact.
- PUT /contacts/:id - updates a contact by ID.
- DELETE /contacts/:id - deletes a contact by ID.
- PATCH /contacts/:id/favorite - marks a contact as a favorite.

#### Users:

- POST /users/signup - registers a new user.
- GET /users/verify/:verificationToken - verifies a user's email.
- POST /users/login - logs in a user.
- PATCH /users - updates a user's subscription.
- GET /users/logout - logs out a user.
- GET /users/current - retrieves data of the currently logged-in user.
- PATCH /users/avatars - updates a user's avatar.
