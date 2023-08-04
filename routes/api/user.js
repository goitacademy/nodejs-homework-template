const express = require("express");
const router = express.Router();

const { validateBodyPost, authenticate, upload } = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const {
  registerValidator,
  loginValidator,
  verifyValidator,
} = require("../../models/user");

// Signup

router.post("/register", validateBodyPost(registerValidator), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBodyPost(verifyValidator),
  ctrl.resentVerifyEmail
);

// Log In

router.post("/login", validateBodyPost(loginValidator), ctrl.login);

// Log out

router.post("/logout", authenticate, ctrl.logout);

// Current

router.get("/current", authenticate, ctrl.getCurrent);

// Chenge avatar
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
