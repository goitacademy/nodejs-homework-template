const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const { auth, upload } = require("../../middlewares");
const {
  logout,
  current,
  avatars,
  verifyEmail,
  repeatVerify,
} = require("../../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(logout));
userRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(current));
userRouter.patch(
  "/avatars",
  upload.single("avatar"),
  tryCatchWrapper(auth),
  tryCatchWrapper(avatars)
);
userRouter.get("/verify/:token", tryCatchWrapper(verifyEmail));
userRouter.post("/verify", tryCatchWrapper(repeatVerify));

module.exports = {
  userRouter,
};
