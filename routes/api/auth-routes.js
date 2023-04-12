const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/user");

const router = express.Router();

//ствоюємо маршрут для реєстрації (signup)
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

//ствоюємо маршрут для логінізації (signin)
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
