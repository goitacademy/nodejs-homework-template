const express = require("express");
const authRouter = express.Router();

const {
  registrationController,
  loginController,
} = require("../../controllers/auth.controller");

const { tryCatchWrapper } = require("../../helpers/wrappers");

authRouter.post("/register", tryCatchWrapper(registrationController));
authRouter.post("/login", tryCatchWrapper(loginController));
// authRouter.post("/logout", tryCatchWrapper(createUserController));

module.exports = authRouter;
