const express = require("express");
const authRouter = express.Router();
const { tryCatchWrapper } = require("../../helpers/index");
const { register } = require("../../controllers/authController/register");
const { login } = require("../../controllers/authController/login");
const {
  changeSubscription,
} = require("../../controllers/authController/changeSubscription");
const { currentUser } = require("../../controllers/authController/currentUser");
const { logoutUser } = require("../../controllers/authController/logoutUser");
const { auth, checkChangeSubscription } = require("../../middelwares/index");
const {
  changeUserAvatar,
} = require("../../controllers/authController/changeUserAvatar");
const { upload } = require("../../middelwares/upload");

authRouter.post("/register", register);
authRouter.post("/login", tryCatchWrapper(login));
authRouter.get("/logout", auth, tryCatchWrapper(logoutUser));
authRouter.get("/current", auth, tryCatchWrapper(currentUser));
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
