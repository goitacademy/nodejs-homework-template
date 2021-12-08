const express = require("express");

const { controlWrapper, auth } = require("../../middlewares");
const { users: controllerContacts } = require("../../controller");

const router = express.Router();

router.get("/current", auth, controlWrapper(controllerContacts.getCurrent));

module.exports = router;

// {

// "email": "bogdan@gmail.com",
// "password": "1111111"
// }
