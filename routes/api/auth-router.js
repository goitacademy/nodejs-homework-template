const express = require("express");

const authController = require("../../controllers/auth-controller");
const { validateBody } = require("../../decorators");

const { isBodyEmpty, authenticate } = require("../../middlewares");

const userSchemas = require("../../schemas/userSchemas");

const authRouter = express.Router();

authRouter.post(
  "/register",
  isBodyEmpty,
  validateBody(userSchemas.userCheckSchema),
  authController.register
);

authRouter.post(
  "/login",
  isBodyEmpty,
  validateBody(userSchemas.userCheckSchema),
  authController.login
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/",
  authenticate,
  isBodyEmpty,
  validateBody(userSchemas.subscriptionUpdateSchema),
  authController.updateSubscription
);

module.exports = authRouter;
