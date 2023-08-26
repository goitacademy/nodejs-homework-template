const express = require("express");
const router = express.Router();
const jsonParser = express.json();
const RegisterController = require("../../controllers/users/login");

router.post("/login", jsonParser, RegisterController.login);

module.exports = router;
