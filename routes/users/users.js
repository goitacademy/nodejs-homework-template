const express = require("express");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../schemas");
const { register, login } = require("../../controlers/users");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

module.exports = router;
