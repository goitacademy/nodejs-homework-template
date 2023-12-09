const express = require("express");

const ctrl = require("../../controllers/users");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { userSchemas } = require("../../models");
const router = express.Router();

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrl.register
);

router.post("/login", validateBody(userSchemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(userSchemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.updSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updAvatar);

module.exports = router;