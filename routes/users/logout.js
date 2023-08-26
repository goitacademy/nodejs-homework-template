const express = require("express");
const router = express.Router();
const jsonParser = express.json();
const RegisterController = require("../../controllers/users/logout");
router.post("/logout", jsonParser, RegisterController.logout);

module.exports = router;
