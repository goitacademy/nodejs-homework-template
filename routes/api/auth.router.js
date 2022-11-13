const express = require("express");
const authRouter = express.Router();

const {
  registrationController,
  loginController,
  logoutController,
} = require("../../controllers/auth.controller");

const { tryCatchWrapper } = require("../../helpers/wrappers");

const { auth } = require("../../middlewares/authMiddleware");

authRouter.post("/register", tryCatchWrapper(registrationController));
authRouter.post("/login", tryCatchWrapper(loginController));
authRouter.post(
  "/logout",
  tryCatchWrapper(auth),
  tryCatchWrapper(logoutController)
);

module.exports = authRouter;
