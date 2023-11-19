# Contacts REST API

This is a simple REST API for managing a collection of contacts. The API is built using Node.js, Express, and other relevant modules.

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm (Node Package Manager)

### Installation

1. **Clone the repository to your local machine:**

    ```bash
    git clone <repository_url>
    ```

2. **Switch to the `hw02-express` branch:**

    ```bash
    git checkout hw02-express
    ```

3. **Install the required modules:**

    ```bash
    npm install
    ```

## Usage

### Running the Server

Start the server using the following command:
```bash```
npm start

The server will be running at http://localhost:3000.

## API Endpoints

### GET /api/contacts

Retrieves all contacts from the collection.

### GET /api/contacts/:id

Retrieves a contact by its unique identifier (id).
- Returns a JSON object with contact details.
- If the contact is not found, returns a JSON object with a "Not found" message and a 404 status.

### POST /api/contacts

Adds a new contact to the collection.
- Requires a JSON body with the fields {name, email, phone}.
- Returns a JSON object with the added contact's details and a 201 status.
- If required fields are missing, returns a JSON object with a "missing required name field" message and a 400 status.

### DELETE /api/contacts/:id

Deletes a contact by its unique identifier (id).
- Returns a JSON object with a "contact deleted" message and a 200 status.
- If the contact is not found, returns a JSON object with a "Not found" message and a 404 status.

### PUT /api/contacts/:id

Updates a contact by its unique identifier (id).
- Requires a JSON body with fields to be updated (name, email, phone).
- Returns a JSON object with the updated contact's details and a 200 status.
- If the contact is not found, returns a JSON object with a "Not found" message and a 404 status.
- If the body is missing, returns a JSON object with a "missing fields" message and a 400 status.

## Data Validation

For data validation, the Joi package is used.

