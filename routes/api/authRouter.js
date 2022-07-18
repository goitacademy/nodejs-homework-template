const express = require("express");
const router = express.Router();
const { upload } = require("../../middlewares");
const { authenticate } = require("../../middlewares");

const {
  signup,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers");

router.post("/users/signup", signup);

router.post("/users/login", login);

router.get("/users/current", authenticate, getCurrent);

router.post("/users/logout", authenticate, logout);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

router.get("/users/verify/:verificationToken", verifyEmail);

router.post("/users/verify", resendVerifyEmail);

module.exports = router;
