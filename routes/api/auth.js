const express = require("express");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();
const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
module.exports = router;
