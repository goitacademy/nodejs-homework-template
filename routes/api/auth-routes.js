const express = require("express");
const { validateRegister, validateLogin } = require('../../utils/validation')
const {authenticate} = require("../../utils/authenticate")
const { register, login, getCurrent, logout, } = require('../../controllers/controllers')

const router = express.Router();

// signup
router.post("/register", validateRegister, register);

// signin
router.post("/login", validateLogin, login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

module.exports = router;