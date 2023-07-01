const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody } = require("../../middleware/contacts");
const { register, login } = require("../../controllers");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

module.exports = router;
