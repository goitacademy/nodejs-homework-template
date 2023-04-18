const express = require("express");
const { authCtrls } = require("../../controllers");
const { authSchemas } = require("../../models");
const { validateBody } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(authSchemas.registerSchema), authCtrls.register);
router.post("/login", validateBody(authSchemas.loginSchema), authCtrls.login);

module.exports = router;
