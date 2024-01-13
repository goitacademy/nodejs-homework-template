const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { userSchema, userSubscriptionSchema } = require("../../models/user");

const router = express.Router();

const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(userSchema), ctrl.registerUser);

router.post("/login", validateBody(userSchema), ctrl.loginUser);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.post("/logout", authenticate, ctrl.logoutUser);

router.patch(
  "/",
  authenticate,
  validateBody(userSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
