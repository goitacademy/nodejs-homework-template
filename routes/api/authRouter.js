const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  updateUserSubscriptionSchema,
} = require("../../schemas/usersSchemas");
const {
  register,
  login,
  verifyEmail,
  resentVerifyEmail,
  getCurrent,
  logout,
  updateUserSubscription,
  updateUserAvatar,
} = require("../../controllers/auth");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", validateBody(verifyEmailSchema), resentVerifyEmail);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/",
  authenticate,
  validateBody(updateUserSubscriptionSchema),
  updateUserSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateUserAvatar
);

module.exports = router;
