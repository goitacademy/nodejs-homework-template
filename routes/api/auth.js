const express = require("express");

const { schemas } = require("../../models/user");

const { validateBody } = require("../../middlewares");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
