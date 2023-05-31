const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const {
  registerSchema,
  loginSchema,
  updateUserSubscriptionSchema,
} = require("../../schemas/usersSchemas");
const {
  register,
  login,
  getCurrent,
  logout,
  updateUserSubscription,
} = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/",
  authenticate,
  validateBody(updateUserSubscriptionSchema),
  updateUserSubscription
);

module.exports = router;
