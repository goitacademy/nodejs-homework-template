const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { validation, authentificate } = require("../../middlewares");
const {
  user: { joiSchema },
} = require("../../models/schemas");

const router = express.Router();

// ***** 1.
// http://localhost:3000/api/v1/users/signup
// валидация работает, все ок
router.post("/signup", validation(joiSchema), ctrl.signup);

// ***** 2.
// http://localhost:3000/api/v1/users/signin
// валидация работает, пользователь логинится, токен приходит
router.post("/signin", ctrl.signin);

// ***** 3.
// пользователь приходит, все ок
router.get("/current", authentificate, ctrl.getCurrentUser);

// ***** 4.
// пользователь разлогинивается
router.get("/logout", authentificate, ctrl.logout);

module.exports = router;
