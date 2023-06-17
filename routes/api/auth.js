const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, autenticate, upload } = require("../../middlewares");

const { shemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(shemas.registerSchema), ctrl.register);

router.get("/verify/:verificationCode", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(shemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(shemas.loginSchema), ctrl.login);

router.get("/current", autenticate, ctrl.getCurrent);

router.post("/logout", autenticate, ctrl.logout);

router.patch(
  "/avatars",
  autenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
module.exports = router;
