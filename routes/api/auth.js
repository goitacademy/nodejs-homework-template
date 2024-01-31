const express = require("express");
const { validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/users");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
