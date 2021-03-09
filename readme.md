# Homework 004 [User Authentication] - Done (without Additional tasks)

## Added packages

```text
npm i bcryptjs jsonwebtoken passport passport-jwt
```

---

## Added files

- model/schemas/schUser.js - defines the shape of the users documents in collection
- configs/passport.js - describe strategy for getting user in guard.js (middleware)
- helpers/guard.js - check auth status and if Ok - req.user = user
- controllers/authUserController.js - deskribes behavior registration, login, logout
- controllers/getCurrentUser.js - deskribes behavior checking current user by token
- model/authModel.js - deskribes authentication functions "login" and "logout"
- model/userModel.js - deskribes user functions "findUserById", "findUserByEmail", "createUser" and "updateUserToken"
- model/shcemas/schUser.js - deskribes User shcema for mongoose
- routes/api/auth.js - create routes for authentication
- routes/api/users.js - create route /users/current
- validation/authUserValidation.js - using Joi validation for Registration and Login routes

---

## Edited files

- app.js - added routes /api/auth and /api/users
- helpers/constants.js - added UserStatus ('free', 'pro', 'premium')
- model/schemas/schContacts.js - added property "owner" with ref: "user",
- controllers/contactsController.js - now every function pass parametr userId to every model method
- helpers/constants.js - added new constants
- routes/api/contacts.js - added /helpers/guard.js middleware for checking auth status

---

## Deleted files

- model/index.js - moved to model/contactModel.js
