import express from "express";
import ctrl from "../../controllers/auth.js";
import { validateBody, authenticate } from "../../middlewares/index.js";
import userSchemas from "../../models/user.js";

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

export default router;
