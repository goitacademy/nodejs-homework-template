// Імпорт express
const express = require("express");

const ctrl = require("../../controllers/auth"); 

const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user")

// Створити роутер
const router = express.Router();

// Маршрут для реєстрації - signup
router.post("/register", validateBody(schemas.registrerSchema), ctrlWrapper(ctrl.register));

// Маршрут для логінізації - signin
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout))

// Експортувати роутер
module.exports = router;