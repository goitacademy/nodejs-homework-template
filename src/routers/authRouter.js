const express = require("express");
const { asyncWrapper } = require("../helpers/apiHelpers");

const authRouter = express.Router();
const {
  registrationController,
  loginController,
} = require("../controllers/authController");

authRouter.post("/registration", asyncWrapper(registrationController));
authRouter.post("/login", asyncWrapper(loginController));

module.exports = authRouter;
