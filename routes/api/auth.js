const express = require("express");

const router = express.Router();

const { auth: ctrl } = require("../../controllers");

const { validation, auth } = require("../../middlewares");

const { schemas } = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");

router.post(
  "/users/signup",
  validation(schemas.registerUser),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/users/login",
  validation(schemas.loginUser),
  ctrlWrapper(ctrl.login)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/users/verify",
  validation(schemas.verifyEmail),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.get("/users/current", auth, ctrlWrapper(ctrl.getCurrent));

router.put("/users/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
