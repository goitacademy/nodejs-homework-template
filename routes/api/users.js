const express = require("express");
const { userControllers } = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");
const { userSchemas } = require("../../models");

const router = express.Router();

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  userControllers.register
);

router.post(
  "/login",
  validateBody(userSchemas.loginSchema),
  userControllers.login
);

router.post("/logout", authenticate, userControllers.logout);

router.get("/current", authenticate, userControllers.getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.subscriptionUserSchema),
  userControllers.changeSubscription
);

module.exports = router;