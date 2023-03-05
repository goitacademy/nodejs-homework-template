Приватна колекція контактів API

Servers: 'https://privatcontacts.onrender.com/api'

User: /users

POST "/register" - create new user

Request body - application/json
Schema
{
"name": "Adrian Cross",
"email": "across@mail.com",
"password": "examplepwd12345",
"avatarURL": "//www.gravatar.com/avatar/cf57abc012c1661a001bd2f914c1aa24"
}

Responses:
User created
status: 201
data: {
email: "across@mail.com",
subscription: "starter"
}

User didn't created.
status: 400
data: {
     message: `Error` 
}

Server error.
status: 500
data: {
     message: `Server error` 
}

