const express = require("express");

const router = express.Router();

const { validateBody, authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/auth");

const schemas = require("../../schemas/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/:userId/subscription",
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateUserSubscription,
);

module.exports = router;
