const express = require("express");
const { authenticate, validateBody, upload } = require("../../middlewares");
const { userSchemas } = require("../../models");
const { users: usersCtrl } = require("../../controllers");

const userRouter = express.Router();

userRouter.get("/current", authenticate, usersCtrl.getCurrentUser);

userRouter.patch(
  "/",
  authenticate,
  validateBody(userSchemas.subscription),
  usersCtrl.updateSubscription
);

userRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  usersCtrl.updateAvatar
);

module.exports = userRouter;
