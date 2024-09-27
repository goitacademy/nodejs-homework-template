const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../utils");

const { authenticate, upload } = require("../../midlleware");

const { userSchemas } = require("../../models");
const { Router } = require("express");

const router = express.Router();

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(userSchemas.registerSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(userSchemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;