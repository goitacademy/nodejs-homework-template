// Створюємо окремі routs для того щоб маніпулювати з сутністю користувача 
const express = require ("express");

const router = express.Router();

const UserControllers = require('../../controllers/users');

const upload = require("../../middleware/upload");

const auth = require("../../middleware/auth")

router.patch("/avatars",auth, upload.single("avatar"), UserControllers.patchUser);

module.exports = router;