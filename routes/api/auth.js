const express = require("express");
const router = express.Router();

const { validateBody, authenticate } = require('../../middlewares/index');
const { registerSchema, loginSchema } = require('../../Schemas/index');
const controller = require('../../controllers/auth/index');

router.post("/register", validateBody(registerSchema), controller.register);

router.post("/login", validateBody(loginSchema), controller.login);

router.get("/current", authenticate, controller.current);

router.post("/logout", authenticate, controller.logout);

module.exports = router;