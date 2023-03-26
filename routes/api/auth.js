const express = require("express");

const crtl = require("../../controllers/auth");

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), crtl.register);

router.post("/login", validateBody(schemas.loginSchema), crtl.login);

module.exports = router;
