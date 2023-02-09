## Node.js

- REST API for Phone book
https://phonebook-node.up.railway.app

- Stack: Node.js, Express.js, MongoDB, Mongoose, Jest

- SendGrid - email verification
- Libs: bcrypt, jsonwebtoken, morgan, multer, http-errors, joi validation,
  gravatar + jimp

- SendGrid - email sending

AUTH:
* SIGNUP: /api/users/signup 
  * POST
  * Body: {
     "email": "example@mail.com",
     "password": "password"
    }

* LOGIN: /api/users/login 
  * POST
  * Body: {
     "email": "example@mail.com",
     "password": "password"
    }
 
* RESEND EMAIL VERIFICATION: /api/users/verify
   * POST
   * Body: {
       "email": "example@mail.com"
      }
 
 * LOGOUT: /api/users/logout
    * GET
    * Headers: 
        * "Authorization": "Bearer {token}"
        
 * CURRENT USER: /api/users/current
    * GET
    * Headers: 
        * "Authorization": "Bearer {token}"
        
 * UPDATE USER SUBSCRIPTION: /api/users/
    * PATCH
    * Headers: 
        * "Authorization": "Bearer {token}"
    * Body: {
        * "subscription" : "business"
      }
      
 * UPDATE USER AVATAR: /api/users/avatars
    * PATCH
    * Headers: 
        * "Authorization": "Bearer {token}"
    * [Content-Type: multipart/form-data]
    * Body: 
        * "avatar": ["file.jpg"]


CONTACTS:
* GET ALL CONTACTS: /api/contacts/
  * GET
  * Headers: 
    * "Authorization": "Bearer {token}"
    
* GET CONTACTS WITH PAGINATION: /api/contacts/?page={number}&limit={perPage}
  * GET
  * Headers: 
    * "Authorization": "Bearer {token}"

* GET FAVORITE CONTACTS:  /api/contacts?favorite=true
  * GET
  * Headers: 
    * "Authorization": "Bearer {token}"

* GET CONTACT BY ID:  /api/contacts/{contactId}
  * GET
  * Headers: 
    * "Authorization": "Bearer {token}"

* ADD CONTACT: /api/contacts/
   * POST
   * Headers: 
     * "Authorization": "Bearer {token}"   
   * Body: {   
     "name": "FirstName LastName",
     "email": "example@mail.com",
     "phone": "(000) 111-111-111",
     ["favorite": false] // default
     }
    
* UPDATE CONTACT: /api/contacts/{id}
   * PUT
   * Headers: 
      * "Authorization": "Bearer {token}"   
   * Body: {   
       "name": "FirstName LastName",
       "email": "example@mail.com",
       "phone": "(000) 111-111-111",
       "favorite": true
     }

* UPDATE CONTACT STATUS: /api/contacts/{id}
   * PATCH
   * Headers: 
      * "Authorization": "Bearer {token}"   
   * Body: {   
       "favorite": true
     }
     
* DELETE CONTACT: /api/contacts/{id}
   * DELETE
   * Headers: 
      * "Authorization": "Bearer {token}"   



        

