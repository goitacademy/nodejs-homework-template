const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const { registerSchema, loginSchema } = require("../../schemas/user");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscriptionStatus,
} = require("../../controllers/users");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/", authenticate, updateSubscriptionStatus);

module.exports = router;
