const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/users");
const guard = require("../../../helpers/guard"); // подключаем guard, чтобы правильно работал и подключился passport

router.post("/signup", controller.signup);

router.post("/login", controller.login);

router.post("/logout", guard, controller.logout); // logout может быть только у зарегестрированного пользователя. logout можно несколькоми способами: на сессиях - удаляется cookie; если есть jwtoken

router.get("/current", guard, controller.currentUser);

router.patch("/subscription", guard, controller.update);

module.exports = router;
