const express = require("express");
const router = express.Router();
const jsonParser = express.json();
const RegisterController = require("../../controllers/users/register");

router.post("/register", jsonParser, RegisterController.register);

module.exports = router;
