const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const { auth, upload, msg } = require("../../middlewares");
const {
  logout,
  current,
  avatars,
} = require("../../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(logout));
userRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(current));
userRouter.patch(
  "/avatars/:id",
  upload.single("avatar"),
  tryCatchWrapper(avatars)
);
// userRouter.get("/verify/:verificationToken", tryCatchWrapper(msg));

module.exports = {
  userRouter,
};
