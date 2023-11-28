const express = require("express");
const uploadAvatar = require("../../controllers/userController");
const { auth } = require("../../middlewares");

const userRouter = express.Router();

userRouter.patch("/avatar", auth, UserController.uploadAvatar);
userRouter.patch(
  "/avatars",
  auth,
  uploadAvatar.single("avatar"),
  ctrl.uploadAvatar
);

userRouter.get("/avatars", authenticate, ctrl.getAvatar);

module.exports = userRouter;
