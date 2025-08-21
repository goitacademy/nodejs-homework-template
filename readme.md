# Contacts Service API

A RESTful API for managing contacts with user authentication, email verification, and profile management features.  
Built with **Node.js**, **Express**, and **MongoDB**.

---

## Features

- **User Authentication & Authorization**

  - User registration with **email verification**.
  - Login with JWT-based authentication.
  - Email confirmation link sent to the registered email.
  - **Resend verification email** in case the first one is missed.
  - Password hashing with bcrypt.

- **Contacts Management (CRUD)**

  - Create, Read, Update, and Delete contacts.
  - Upload and update **contact avatars**.
  - Pagination and filtering support.

- **User Profile Management**

  - Update **subscription plan**.
  - Update **user avatar**.

- **Security**
  - Protected routes (JWT required).
  - Validation with Joi.
  - Error handling middleware.

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, bcrypt
- **Email Service:** Nodemailer (SMTP)
- **File Uploads:** Multer
- **Validation:** Joi
- **Environment Management:** dotenv

---

## API Endpoints

### Auth

| Method | Endpoint                   | Description                                       |
| ------ | -------------------------- | ------------------------------------------------- |
| POST   | `/api/users/register`      | Register a new user (email verification required) |
| POST   | `/api/users/login`         | Authenticate user and return token                |
| GET    | `/api/users/verify/:token` | Verify email using token                          |
| POST   | `/api/users/verify`        | Resend verification email                         |

### User

| Method | Endpoint                  | Description                          |
| ------ | ------------------------- | ------------------------------------ |
| GET    | `/api/users/current`      | Get current user info (JWT required) |
| PATCH  | `/api/users/subscription` | Update subscription plan             |
| PATCH  | `/api/users/avatar`       | Update user avatar                   |

### Contacts

| Method | Endpoint                   | Description                               |
| ------ | -------------------------- | ----------------------------------------- |
| GET    | `/api/contacts`            | Get all contacts (with pagination/filter) |
| GET    | `/api/contacts/:id`        | Get contact by ID                         |
| POST   | `/api/contacts`            | Create new contact                        |
| PUT    | `/api/contacts/:id`        | Update contact                            |
| PATCH  | `/api/contacts/:id/avatar` | Update contact avatar                     |
| DELETE | `/api/contacts/:id`        | Delete contact                            |

---

## Installation

```bash
# Clone repository
git clone https://github.com/your-username/contacts_service.git

# Navigate to project folder
cd contacts_service

# Install dependencies
npm install

# Create .env file based on .env.example


# Development
npm run dev

# Production
npm start


contacts_rest_api/
│── controllers/    # Route handlers
│── decorators/       #reusable functions
│── helpers/         # Helpers (email sender, etc.)
│── middlewares/    # Auth, error handlers, validation
│── models/    # Mongoose models
│── services/       # Business logic
│── routes/api # API routes
│── uploads/        # Avatar storage
│── .env.example  #example env variables
│── server.js # core file to start project
```
