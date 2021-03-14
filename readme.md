# Homework 005 [Images Avatar] - Done (without Additional tasks)

## Added packages

[Multer](https://www.npmjs.com/package/multer) - is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

```text
npm i multer
```

[Gravatar](https://www.npmjs.com/package/gravatar) - a library to generate Gravatar URLs in Node.js Based on gravatar specs

```text
npm i gravatar
```

[Jimp](https://www.npmjs.com/package/jimp) - JavaScript Image Manipulation Program gravatar specs

```text
npm i jimp
```

---

## Added files

- controllers/imageController.js - get avatar image, rename, normalize with 'Jimp', put in 'public/images' and pass static avatarURl to database
- helpers/create-dir.js - create folders if not exist
- helpers/upload.js - require('multer') and from form-data to 'tmp' folder
- routes/api/images.js - create route for uploading image
- validation/uploadAvatarValidation.js - custom validation for uploaded images

---

## Edited files

- app.js - added route '/images' and express.static
- bin/server.js - require new helper create-dir (createFolderIsExist)
- controllers/authUserController.js - afded field avatarURL to response
- controllers/userController.js - afded field avatarURL to response
- model/userModel.js - added user function "updateAvatar"
- model/schemas/schUser.js - added property "avatarURL"
- routes/api/users.js - added validation and added route /users/avatars

---
