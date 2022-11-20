const express = require("express");
const authRouter = express.Router();

const {
  registrationController,
  loginController,
  logoutController,
  currentController,
} = require("../../controllers/auth.controller");
const { uploadController } = require("../../controllers/avatars.controller");

const { tryCatchWrapper } = require("../../helpers/wrappers");

const { auth } = require("../../middlewares/authMiddleware");
const uploadAvatarMiddleware = require("../../middlewares/uploadAvatarMiddleware");

authRouter.post("/register", tryCatchWrapper(registrationController));
authRouter.post("/login", tryCatchWrapper(loginController));
authRouter.post(
  "/logout",
  tryCatchWrapper(auth),
  tryCatchWrapper(logoutController)
);
authRouter.get(
  "/current",
  tryCatchWrapper(auth),
  tryCatchWrapper(currentController)
);

authRouter.patch(
  "/avatars",
  tryCatchWrapper(auth),
  uploadAvatarMiddleware.single("avatar"),
  tryCatchWrapper(uploadController)
);

module.exports = authRouter;
