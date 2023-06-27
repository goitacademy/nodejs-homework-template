const express = require("express");
const router = express.Router();
const schemas = require("../../schemas/users");
const { validateBody } = require("../../middlewars");
const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
