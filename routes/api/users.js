const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
} = require("../../controllers");
const {
  validateUser,
  authMiddleware,
  validateSubscription,
} = require("../../middlewares");
const { controllerWrapper } = require("../../helpers");

const router = express.Router();

router.post("/register", validateUser, controllerWrapper(registerController));

router.post("/login", validateUser, controllerWrapper(loginController));

router.post("/logout", authMiddleware, controllerWrapper(logoutController));

router.get(
  "/current",
  authMiddleware,
  controllerWrapper(getCurrentUserController)
);

router.patch(
  "/",
  validateSubscription,
  authMiddleware,
  controllerWrapper(updateSubscriptionController)
);

module.exports = { userRouter: router };
