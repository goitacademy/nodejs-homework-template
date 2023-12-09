// в папке роут апи созд. файл для авторизации auth

const express = require("express"); // импортируем експресс

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares"); // импорт. миделвару для проверки запроса

const { schemas } = require("../../models/user");

const router = express.Router(); // создаем роутер (обьект где будем записывать авторизацию)

// перед созданием маршрута для регистрации необходимо(правильно) создать модель (папка моделсб файл юзерс(один из немногих случаев когда назвю коллекции и роута не совпадает))

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// создаем маршрут для авторизации

router.post("/login", validateBody(schemas.registerSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router; // экспортируем роутер в апп
