const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody } = require("../../middleware/contacts");
const { register, login, getCurrent, logout } = require("../../controllers");
const authenticate = require("../../middleware/authenticate");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.post("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

module.exports = router;
