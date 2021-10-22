Routes description
//auth

- POST api/auth/users/signup
  {
  "email": "123@ukr.net",
  "password": "1234567"
  }

- POST api/auth/users/login
  {
  "email": "123@ukr.net",
  "password": "1234567"
  }

- GET api/auth/users/current

- GET api/auth/users/logout

//users

- PATCH api/users
  {
  "subscription": ["starter", "pro", "business"]
  }

- PATCH api/users/avatars
  form-data: avatar

//usercontacts

- GET api/usercontacts

- POST api/usercontacts
  add
  {
  "name": "Adam Smith"
  "email": "123@ukr.net",
  "phone": "098-324-42-42"
  }

//contacts

- GET api/contacts

- GET api/contacts/:contactId

- POST api/contacts
  add
  {
  "name": "Adam Smith"
  "email": "123@ukr.net",
  "phone": "098-324-42-42"
  }

- PUT api/contacts/:contactId
  update
  {
  "name": "Piter Lewis"
  }

- DELETE api/contacts/:contactId
- PATCH api/contacts/:contactId/favorite
  update status
  {
  "favorite": true/false
  }
