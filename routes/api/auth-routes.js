const express = require("express");

const router = express.Router();

const validation = require("../../utils/validation");
const controllers = require("../../controllers/auth-controllers");

router.post("/register", validation.validateRegistration, controllers.register);
router.post("/login", validation.validateLogin, controllers.login);

module.exports = router;