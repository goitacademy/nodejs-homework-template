Приватна колекція контактів API

Servers: 'https://privatcontacts.onrender.com/api'

User: /users

Registration request
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


Login request
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


Contacts: /contacts

GET "/" - get list of contacts

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


POST "/" - add contact to user contacts list

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
"_id": "cf57abc012c1661a001bd2f914c1aa24",
"favorite": "false",
  owner: {
    "name": "Sofia",
    "_id": "cf57abc012c1661a001bd2f914c1aa24"
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


GET "/:id" - get contact by id

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
"_id": "cf57abc012c1661a001bd2f914c1aa24",
"favorite": "false",
  owner: {
    "name": "Sofia",
    "_id": "cf57abc012c1661a001bd2f914c1aa24"
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


DELETE "/:id" - delete contact by id

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


@ PUT /api/contacts/:id
Отримує параметр id
Отримує body в json-форматі c оновленням будь-яких полів name, email и phone
Якщо body немає, повертає json з ключем {"message": "missing fields"} і статусом 400
Якщо з body всі добре, викликає функцію updateContact(contactId, body). (Напиши її) для поновлення контакту в файлі contacts.json
За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем "message": "Not found" і статусом 404


@ PATCH / api / contacts /: contactId / favorite
Отримує параметр contactId
Отримує body в json-форматі c оновленням поля favorite
Якщо body немає, повертає json з ключем {"message": "missing field favorite"}і статусом 400
Якщо з body все добре, викликає функцію updateStatusContact (contactId, body) (напиши її) для поновлення контакту в базі
За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем " message ":" Not found " і статусом 404