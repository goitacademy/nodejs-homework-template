// Створюємо окремі routs для того щоб маніпулювати з сутністю користувача 
const express = require ("express");

const router = express.Router();

const UserControllers = require('../../controllers/users');

const upload = require("../../middleware/upload");

router.patch("/avatars", upload.single("avatar"), UserControllers.patchUser);

module.exports = router;