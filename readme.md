# Homework 004 [User Authentication] - Step 1 Done

## Added packages

```text
npm i bcryptjs jsonwebtoken passport passport-jwt
```

---

## Added files

- model/schemas/schUser.js - defines the shape of the users documents in collection

---

## Edited files

- helpers/constants.js - added UserStatus ('free', 'pro', 'premium')
- model/schemas/schContacts.js - added property "owner" with ref: "user",

---
