const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { userSchemas } = require("../../models");

const router = express.Router();

// Sign Up
router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrl.register
);

// Sign In
router.post("/login", validateBody(userSchemas.loginSchema), ctrl.login);

// Get current user
router.get("/current", authenticate, ctrl.getCurrent);

// Logout
router.post("/logout", authenticate, ctrl.logout);

// Update subscription
router.patch(
  "/subscription",
  authenticate,
  validateBody(userSchemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

// Update avatar
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
