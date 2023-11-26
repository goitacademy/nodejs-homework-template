# Contacts REST API

Contacts REST API is a simple Node.js application based on MongoDB, which allows modifying a contact list via HTTP requests. This is part of the GoIT course where I learned Node.js and related tools.

## Features

- Adding a new contact
- Displaying a list of all contacts
- Displaying details of a specific contact
- Updating a contact
- Deleting a contact

## Installation

1. Clone the repository to your local environment.
2. Install dependencies using `npm install`.
3. Run the server in development mode using `npm run start:dev`.

## Usage

### Displaying a list of all contacts

Send a GET request to `/api/contacts`.

### Adding a new contact

Send a POST request to `/api/contacts` with a JSON containing `name`, `email`, and `phone`.

### Displaying details of a specific contact

Send a GET request to `/api/contacts/:id`.

### Updating a contact

Send a PATCH request to `/api/contacts/:id` with a JSON containing fields to update.

### Deleting a contact

Send a DELETE request to `/api/contacts/:id`.

## Commands

- `npm start` — runs the server in production mode
- `npm run start:dev` — runs the server in development mode
- `npm run lint` — runs ESLint to check the code, should be run before every PR and all linter errors should be fixed
- `npm run lint:fix` — the same as above, but also automatically fixes simple errors
