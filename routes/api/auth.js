const express = require("express");
const router = express.Router();
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/users");
const {
  updateSubscription,
  logout,
  getCurrent,
  login,
  register,
} = require("../../controlers/auth");

router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrent);
router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  updateSubscription
);

module.exports = router;
