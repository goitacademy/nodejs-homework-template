const express = require("express");
const authRouter = express.Router();
const { tryCatchWrapper } = require("../../helpers/index");
const {
  register,
  login,
  currentUser,
  logoutUser,
  changeUserAvatar,
  changeSubscription,
  verifyEmail,
  reVerificationOfEmail,
} = require("../../controllers");

const { auth, checkChangeSubscription } = require("../../middelwares/index");
const { upload } = require("../../middelwares/upload");

authRouter.post("/register", register);
authRouter.post("/login", tryCatchWrapper(login));
authRouter.get("/logout", auth, tryCatchWrapper(logoutUser));
authRouter.get("/current", auth, tryCatchWrapper(currentUser));
authRouter.get("/verify/:verificationToken", tryCatchWrapper(verifyEmail));
authRouter.post("/verify", tryCatchWrapper(reVerificationOfEmail));
authRouter.patch(
  "/",
  auth,
  changeSubscription,
  tryCatchWrapper(checkChangeSubscription)
);
authRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  tryCatchWrapper(changeUserAvatar)
);

module.exports = authRouter;
