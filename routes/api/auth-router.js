const express = require("express");

const authController = require("../../controllers/auth");

const { isEmptyBody, authenticate } = require("../../middlewares");

const { validateBody } = require("../../decorators");

const { userAuthSchema, userSubscriptionSchema } = require("../../models/User");

const userAuthValidate = validateBody(userAuthSchema);
const userSubscriptionValidate = validateBody(userSubscriptionSchema);

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  userAuthValidate,
  authController.register
);

authRouter.post("/login", isEmptyBody, userAuthValidate, authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/users",
  authenticate,
  isEmptyBody,
  userSubscriptionValidate,
  authController.updateSubscription
);

module.exports = authRouter;
