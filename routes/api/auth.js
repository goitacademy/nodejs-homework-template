const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");
const { validation, authentic } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");

router.post(
  "/signup",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.signup)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post(
  "/verify",
  validation(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmail)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authentic, ctrlWrapper(ctrl.logout));

module.exports = router;
