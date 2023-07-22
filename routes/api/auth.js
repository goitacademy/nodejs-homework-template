const express = require("express");

const { validateBody, authenticate } = require("../../middleware");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

// signUp

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// signIn

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
