const express = require("express");
const ctrl = require("../../controllers/auth-controllers");

const { validateBody } = require("../../utils");
const { schemas } = require("../../models/user");

const router = express.Router();

// sighnup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
// sighnin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
