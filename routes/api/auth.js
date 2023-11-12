const express = require("express");
const { validateBody, authenticate } = require("../../middleware");
const { schemas } = require("../../schemas");
const { User } = require("../../controllers");
const router = express.Router();

router.post("/register", validateBody(schemas.signUpSchema), User.register);

router.post("/login", validateBody(schemas.loginSchema), User.login);

router.post("/logout", authenticate, User.logout);

router.post("/current", authenticate, User.getCurrent);

router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  User.updateSubscription
);

module.exports = router;
