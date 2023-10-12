const express = require("express");

const { ctrlAuth } = require("../../../controllers");

const { validateBody, authenticate, upload } = require("../../../middleware");

const { userJoiSchemas } = require("../../../models");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userJoiSchemas.registerSchema),
  ctrlAuth.register
);

authRouter.post(
  "/login",
  validateBody(userJoiSchemas.loginSchema),
  ctrlAuth.login
);

authRouter.get("/current", authenticate, ctrlAuth.getCurrent);

authRouter.post("/logout", authenticate, ctrlAuth.logout);

authRouter.patch(
  "/users",
  authenticate,
  validateBody(userJoiSchemas.updateSubscriptionSchema),
  ctrlAuth.updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlAuth.updateAvatar
);

module.exports = authRouter;
