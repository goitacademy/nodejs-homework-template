const express = require("express");
const { authentificate } = require("../../utils/authentficate");
const { validateBody } = require("../../decorators/validateBody");
const {
  signup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerificationCode
} = require("../../controllers/authControllers");
const {
  signupSchema,
  loginSchema,
  updateSubSchema,
  emailSchema,
} = require("../../schemas/authSchemas");
const { upload } = require("../../utils/upload");

const router = express.Router();

router.post("/register", validateBody(signupSchema), signup);

router.post("/verify", validateBody(emailSchema), resendVerificationCode);

router.get("/verify/:verificationCode", verifyEmail);

router.post("/login", validateBody(loginSchema), login);

router.post("/logout", authentificate, logout);

router.get("/current", authentificate, getCurrentUser);

router.patch(
  "/",
  authentificate,
  validateBody(updateSubSchema),
  updateSubscription
);

router.patch("/avatars", authentificate, upload.single("avatar"), updateAvatar);

module.exports = { authRouter: router };
