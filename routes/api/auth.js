const express = require("express");

const router = express.Router();

const { controllersAuth } = require("../../controllers");

const { register, login, getCurrent, logout, updateSubscription } =
  controllersAuth;

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), register);

router.get("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  updateSubscription
);

module.exports = router;
