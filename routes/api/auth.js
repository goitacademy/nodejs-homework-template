const express = require("express");
const auth = require("../../controllers/auth");
const { validateBody, validateSubscription } = require("../../middlewares");
const schemas = require("../../schemas");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.userSchema), auth.register);

router.post("/login", validateBody(schemas.userSchema), auth.login);

router.post("/logout", authenticate, auth.logout);

router.get("/current", authenticate, auth.getCurrentUser);

router.patch(
  "/",
  authenticate,
  validateSubscription(schemas.subscriptionSchema),
  auth.updateSubscriptionStatus
);

module.exports = router;
