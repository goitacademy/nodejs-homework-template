const express = require("express");
const { validateBody } = require("../../middlewares");
const { authSchema, loginSchema } = require("../../models/users");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(authSchema), ctrl.register);

router.post("/login", validateBody(loginSchema), ctrl.login);

module.exports = router;
