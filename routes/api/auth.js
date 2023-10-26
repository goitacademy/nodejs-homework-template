const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  updateUserAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth");
const authenticate = require("../../middlewares/authenticate");
const { updateSubscription } = require("../../controllers/userController");
const upload = require("../../middlewares/avatarUpload");

const router = express.Router();

router.post("/register", register);
router.get("/verify/:verificationToken", verifyEmail);
router.post ("/verify", resendVerifyEmail)
router.post("/login", login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateUserAvatar
);
router.patch("/:id", authenticate, updateSubscription);

module.exports = router;
