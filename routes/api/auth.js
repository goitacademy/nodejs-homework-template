const express = require("express");

const router = express.Router();

const { validation } = require("../../middlewares");
const { loginSchema } = require("../../schemas");
const { auth } = require("../../controllers");

router.post("/register", validation(loginSchema), auth.register);

router.post("/login", validation(loginSchema), auth.login);

module.exports = router;
