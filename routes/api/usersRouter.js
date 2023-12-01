const express = require("express");
const auth = require("../../middlewares/authMiddleware");
const uploadAvatar = require("../../middlewares/uploadAvatar");
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
