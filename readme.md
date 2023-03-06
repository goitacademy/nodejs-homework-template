<h1>Приватна колекція контактів API</h1>

<h2 color="yellow">Servers: 'https://privatcontacts.onrender.com/api'</h2>

https://img.shields.io/badge/ -User: /users-orange
       
<h3 background-color="orange">User: /users</h3>

<p background-color="green">Registration request</p>
POST /register
Content-Type: application/json
RequestBody: {
"name": "Adrian Cross",
"email": "across@mail.com",
"password": "examplepwd12345",
"avatarURL": "//www.gravatar.com/avatar/cf57abc012c1661a001bd2f914c1aa24"
}

Registration validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {"message": `Error`}

Registration conflict error
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
"message": "Email in use"
}

Server error.
Status: 500
Content-Type: application/json
ResponseBody: {
"message": `Server error`
}

Registration success response
Status: 201 Created
Content-Type: application/json
ResponseBody: {
"name": "Adrian Cross",
"email": "example@example.com",
"subscription": "starter",
"avatarURL": "//www.gravatar.com/avatar/cf57abc012c1661a001bd2f914c1aa24"
}

<p background-color="green">Login request</p>
GET /login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}

Login validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {"message": `Error`}

Login auth error
Status: 401 Unauthorized
ResponseBody: {
"message": "Email or password is wrong"
}

Login success response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
"accessToken": "f57abc012c1661a001bd2f914c1aa2",
"refreshToken": "f57abc012c1661a001bd2f914c1aa2kjhklhkljhju",
user: {
"name": "Adrian Cross",
"email": "example@example.com",
"subscription": "starter",
"avatarURL": "//www.gravatar.com/avatar/cf57abc012c1661a001bd2f914c1aa24"
},
}

<p background-color="green">Logout request</p>
POST /logout
Authorization: "Bearer {{token}}"

Logout unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}

Logout success response
Status: 204 No Content

<p background-color="green">Current user request</p>
GET /current
Authorization: "Bearer {{token}}"

Current user unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}

Current user success response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
"email": "example@example.com",
"subscription": "starter"
}

<p background-color="green">Update user avatar request</p>
PATCH /avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: download file

Success response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
"avatarURL": "link"
}

User unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}

<p background-color="green">Verification request</p>
GET /verify/:verificationToken

Verification user Not Found
Status: 404 Not Found
ResponseBody: {
message: 'User not found'
}

Verification success response
Status: 200 OK
ResponseBody: {
message: 'Verification successful',
}

<p background-color="green">Resending a email request</p>
POST /verify
Content-Type: application/json
RequestBody: {
  "email": "example@example.com"
}

Resending a email validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {"message": `Error`}

Resending a email success response
Status: 200 Ok
Content-Type: application/json
ResponseBody: {
"message": "Verification email sent"
}

Resend email for verified user
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {
message: "Verification has already been passed"
}

<h3 background-color="orange">Contacts: /contacts</h3>

<p background-color="green">GET "/" - get list of contacts</p>
Authorization - The accessToken issued to the current user.
Parameters: page, limit; defoult(page=1, limit=5)

Responses:
Get list
status: 200
Content-Type: application/json
data: [{
"name": "Adrian Cross",
"email": "across@mail.com",
"phone": "526-569-589",
"_id": "cf57abc012c1661a001bd2f914c1aa24",
"favorite": "false",
owner: {
"name": "Sofia",
"_id": "cf57abc012c1661a001bd2f914c1aa24"
}
}]

User didn't find or autorization.
status: 401
data: {
message: `Error`
}

Server error.
status: 500
data: {
message: `Server error`
}

<p background-color="green">POST "/" - add contact to user contacts list</p>
Authorization - The accessToken issued to the current user.
Request body - application/json
Schema
{
"name": "Adrian Cross",
"email": "across@mail.com",
"phone": "526-569-589",
}

Responses:
Contact created
status: 201
Content-Type: application/json
data: {
"name": "Adrian Cross",
"email": "across@mail.com",
"phone": "526-569-589",
"\_id": "cf57abc012c1661a001bd2f914c1aa24",
"favorite": "false",
owner: {
"name": "Sofia",
"\_id": "cf57abc012c1661a001bd2f914c1aa24"
}
}

Contact didn't created.
status: 400
data: {
message: `Error`
}

Server error.
status: 500
data: {
message: `Server error`
}

<p background-color="green">GET "/:id" - get contact by id</p>
Authorization - The accessToken issued to the current user.
Parameters: id;

Responses:
Get contact
status: 200
Content-Type: application/json
data: {
"name": "Adrian Cross",
"email": "across@mail.com",
"phone": "526-569-589",
"\_id": "cf57abc012c1661a001bd2f914c1aa24",
"favorite": "false",
owner: {
"name": "Sofia",
"\_id": "cf57abc012c1661a001bd2f914c1aa24"
}
}

Contact didn't find.
status: 404
data: {
message: `Not found`
}

No autorization.
status: 401
data: {
message: `Error`
}

Server error.
status: 500
data: {
message: `Server error`
}

<p background-color="green">DELETE "/:id" - delete contact by id</p>
Authorization - The accessToken issued to the current user.
Parameters: id;

Responses:
Delete contact
status: 200
data: {
"message": "Contact deleted"
}

Contact didn't find.
status: 404
data: {
message: `Not found`
}

No autorization.
status: 401
data: {
message: `Error`
}

Server error.
status: 500
data: {
message: `Server error`
}
