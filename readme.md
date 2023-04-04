#  Node.js REST API for Phone Book

This is a Node.js REST API for managing phone book contacts. It uses Express.js, MongoDB, Mongoose, Jest, and several other libraries.
The application also integrates SendGrid for email verification and sending.

It provides endpoints for user authentication, managing contacts, and sending email notifications using SendGrid.

# Deployment
The app is deployed at https://phonebook-node.up.railway.app.

# Stack

  * Node.js
  * Express.js
  * MongoDB
  * Mongoose
  * Jest
  
# Libraries

  * bcrypt
  * jsonwebtoken
  * morgan
  * multer
  * http-errors
  * joi validation
  * gravatar + jimp
  
  
# Features
   * Email verification using SendGrid
   * Email sending using SendGrid
   * User authentication (signup, login, logout)
   * Current user retrieval
   * User subscription updating
   * User avatar updating
   * Contact management (add, update, delete, get all, get by ID, get with pagination, get favorite)

# Installation

  * Clone this repository:
          
          git clone https://github.com/<your-github-username>/phonebook-node.git

  * Install the dependencies:
  
          npm install

  * Create a .env file and add the necessary environment variables:
      
          PORT=<port>
          BASE_URL=<base url>
          MONGO_URL=<mongodb-uri>
          JWT_SECRET=<jwt-secret>
          SEND_GRID_API_KEY=<sendgrid-api-key>

  * Start the server:
  
          npm start

# Main endpoints

# Authentication

* Signup: POST /api/users/signup
  * Body: {
     "email": "example@mail.com",
     "password": "password"
    }

* Login: POST /api/users/login
  * Body: {
     "email": "example@mail.com",
     "password": "password"
    }
 
* Resend email verification: POST /api/users/verify
   * Body: {
       "email": "example@mail.com"
      }
 
 * Logout: GET /api/users/logout
    * Headers: 
        * "Authorization": "Bearer {token}"
        
 * Current user: GET /api/users/current
    * Headers: 
        * "Authorization": "Bearer {token}"
        
 * Update user subscription: PATCH /api/users/
    * Headers: 
        * "Authorization": "Bearer {token}"
    * Body: {
        * "subscription" : "business"
      }
      
 * Update user avatar: PATCH /api/users/avatars
      * Headers: { "Authorization": "Bearer {token}" }
      * Body: Content-Type: multipart/form-data
      * Body: "avatar": ["file.jpg"]


# Contacts
* Get all contacts: GET /api/contacts/
  * Headers: 
    * "Authorization": "Bearer {token}"
    
* Get contacts with pagination: GET /api/contacts/?page={number}&limit={perPage}
  * Headers: 
    * "Authorization": "Bearer {token}"

* Get favorite contacts: GET /api/contacts?favorite=true
  * Headers: 
    * "Authorization": "Bearer {token}"

* Get contact by ID: GET /api/contacts/{contactId}
  * Headers: 
    * "Authorization": "Bearer {token}"

* Add contact: POST /api/contacts/
   * Headers: 
     * "Authorization": "Bearer {token}"   
   * Body: {   
     "name": "FirstName LastName",
     "email": "example@mail.com",
     "phone": "(000) 111-111-111",
     ["favorite": false] // default
     }
    
* Update contact: PUT /api/contacts/{id}
   * Headers: 
      * "Authorization": "Bearer {token}"   
   * Body: {   
       "name": "FirstName LastName",
       "email": "example@mail.com",
       "phone": "(000) 111-111-111",
       "favorite": true
     }

* Update contact status: PATCH /api/contacts/{id}
   * Headers: 
      * "Authorization": "Bearer {token}"   
   * Body: {   
       "favorite": true
     }
     
* Delete contact: DELETE /api/contacts/{id}
   * Headers: 
      * "Authorization": "Bearer {token}"   



        

