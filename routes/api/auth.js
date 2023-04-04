const express = require("express");

const crtl = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

//  sign-up
router.post("/register", validateBody(schemas.registerSchema), crtl.register);

router.get("/verify/:verificationCode", crtl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  crtl.resendVerifyEmail
);

//  sign-in
router.post("/login", validateBody(schemas.loginSchema), crtl.login);

router.get("/current", authenticate, crtl.getCurrent);

router.post("/logout", authenticate, crtl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  crtl.updateAvatar
);

module.exports = router;
