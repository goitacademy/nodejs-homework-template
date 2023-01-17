const express = require("express");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const authRouter = express.Router();
const {
  registrationController,
  loginController,
  logoutController,
  currentController,
} = require("../controllers/authController");

authRouter.post("/registration", asyncWrapper(registrationController));
authRouter.post("/login", asyncWrapper(loginController));
authRouter.get("/logout", authMiddleware, asyncWrapper(logoutController));
authRouter.get("/current", authMiddleware, asyncWrapper(currentController));

module.exports = authRouter;
