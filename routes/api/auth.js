const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// Sign Up
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// Sign In
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
