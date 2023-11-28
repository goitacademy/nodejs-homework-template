const express = require("express");

const { auth, uploadAvatar } = require("../../middlewares");
const ctrl = require("../../controllers/userController");
const userRouter = express.Router();

userRouter.patch(
  "/avatars",
  auth,
  uploadAvatar.single("avatar"),
  ctrl.updateAvatar
);

userRouter.get("/avatars", auth, ctrl.getAvatar);

module.exports = userRouter;
