const express = require("express");

const { ctrlA } = require("../../controllers");

const { validateBody } = require("../../utils");

const { authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrlA.register);

router.get("/verify/:verificationToken", ctrlA.verify);

router.post(
  "/verify/",
  validateBody(schemas.emailSchema),
  ctrlA.resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginSchema), ctrlA.login);

router.get("/current", authenticate, ctrlA.getCurrent);

router.post("/logout", authenticate, ctrlA.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlA.updateAvatar
);

module.exports = router;
