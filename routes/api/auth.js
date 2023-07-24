const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getCurrent,
  userSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth-controller");
const { validateBody, authMiddleware } = require("../../middlewares");
const { schemas } = require("../../models/user");
const upload = require("../../middlewares/upload");

router.patch(
  "/",
  authMiddleware,
  validateBody(schemas.subscriptionSchema),
  userSubscription
);
router.post(
  "/register",
  validateBody(schemas.registerSchema, "fields"),
  register
);
router.post("/login", validateBody(schemas.loginSchema), login);
router.post("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, getCurrent);
router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);
router.post("/verify", validateBody(schemas.verifySchema), resendVerifyEmail);
router.get("/verify/:verificationToken", verifyEmail);

module.exports = router;
