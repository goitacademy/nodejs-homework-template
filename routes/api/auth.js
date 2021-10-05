const express = require("express");

const { joiSchema } = require("../../models/user");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");

//переименовываем auth в ctrl
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

/*
1. Регистраця нового нового пользователя.
2. Аутентификациия (login) зарегистрированного пользователя.
3. Авторизация аутентифицированного (зашедшего на сайт) пользователя.
4. Выход (Logout).
*/

// api/auth/register
router.post(
  "/register",
  validation(joiSchema),
  controllerWrapper(ctrl.register)
);
// router.post("/signup")

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));
// router.post("/signin")

router.get("/logout", authenticate, controllerWrapper(ctrl.logout));
// router.get("/signout")

router.get("/current", authenticate, controllerWrapper(ctrl.current));

module.exports = router;
