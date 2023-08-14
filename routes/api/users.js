const express = require("express");

const {
  authenticate,
  validateData,
  uploadAvatar,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const {
  registerNewUser,
  logInUser,
  logOutUser,
  currentUser,
  uploadUserAvatar,
  verificationEmail,
  resendVerifyEmail
} = require("../../controllers/users");

const router = express.Router();

/**
 * REGISTRATION NEW USER
 */
router.post("/register", validateData(schemas.registerSchema), registerNewUser);

/**
 * LOG IN USER
 */
router.post("/login", validateData(schemas.loginSchema), logInUser);

/**
 * LOG OUT USER
 */
router.post("/logout", authenticate, logOutUser);

/**
 * GET DATA ABOUT CURRENT USER
 */
router.get("/current", authenticate, currentUser);

/**
 * UPDATE USER AVATAR
 */
router.patch(
  "/avatars",
  authenticate,
  uploadAvatar.single("avatar"),
  uploadUserAvatar
);

/**
 * SEND VERIFICATION EMAIL
 */
router.get("/verify/:verificationToken", verificationEmail)


/**
 * RESEND VERIFICATION EMAIL
 */
router.post('/verify/', validateData(schemas.emailSchema), resendVerifyEmail)


module.exports = router;
