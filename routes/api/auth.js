const express = require("express");
const router = express.Router();
const { validateBody } = require('../../middlewares/index');
const { shemasLoginRegister } = require('../../Schemas/index');
const controller = require('../../controllers/auth/index');

router.post("/register", validateBody(shemasLoginRegister.registerSchema), controller.register);

router.post("/login", validateBody(shemasLoginRegister.loginSchema), controller.login);

module.exports = router;