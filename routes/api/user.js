const express = require("express");
const { authenticate, validateBody } = require("../../middlewares");
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

module.exports = userRouter;
