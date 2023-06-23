const express = require("express");
const { validateBody, authenticate, isValidId } = require("../../middlewares");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/users");

const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../schemas");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  validateBody(subscriptionSchema),
  updateSubscription
);

module.exports = router;
