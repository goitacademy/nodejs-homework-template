const express = require("express");
const router = express.Router();

const { controllerUsers } = require("../../controllers");
const { authMiddleware, uploadAvatarMidlw } = require("../../middlewares");

// =====================  REGISTER  =====================
router.post("/signup", controllerUsers.signup);

// =====================  LOGIN  =====================
router.post("/login", controllerUsers.login);

// =====================  GET CURRENT USER  =====================
// Using authorization/authentification Middleware that helps to get current user only if logged in
router.get("/current", authMiddleware, controllerUsers.getCurrent);

// =====================  UPDATE USER BY SUBSCRIPTION CATEGORY  ==================
router.patch(
  "/subscription",
  authMiddleware,
  controllerUsers.updateSubscription
);

// =====================  UPDATE AVATAR  ==================
// using uploadAvatarMidlw middleware that uploads One(single) avatar into a temp directory
router.patch(
  "/avatars",
  authMiddleware,
  uploadAvatarMidlw.single("avatar"),
  controllerUsers.updateAvatar
);

// =====================  GET VERIFY EMAIL  =====================
router.get("/verify/:verificationToken", controllerUsers.verifyEmail);

// =====================  REVERIFY EMAIL  =====================
router.post("/verify", controllerUsers.reVerificationEmail);

// =====================  LOGOUT  =====================
// Using authMiddleware to check if the user is logged-in
router.get("/logout", authMiddleware, controllerUsers.logout);

module.exports = router;
