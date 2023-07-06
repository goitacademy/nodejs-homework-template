const express = require("express");

const {
  validateUser,
  protect,
  validateSubscription,
  upload,
  validateEmail
} = require("../../middlewares");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resentVerifyEmail
} = require("../../controllers");

const router = express.Router();

router.post("/register", validateUser(), register);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", validateEmail(), resentVerifyEmail)
router.post("/login", validateUser(), login);
router.get("/current", protect, getCurrent);
router.post("/logout", protect, logout);
router.patch("/", protect, validateSubscription(), updateSubscription);
router.patch("/avatars", protect, upload.single("avatar"), updateAvatar);

module.exports = router;
