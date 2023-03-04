const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/users/register", validateBody(schemas.registerSchema), register);

router.post("/users/login", validateBody(schemas.loginSchema), login);

router.get("/users/current", authenticate, getCurrent);

router.post("/users/logout", authenticate, logout);

router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchems),
  updateSubscription
);

module.exports = router;
