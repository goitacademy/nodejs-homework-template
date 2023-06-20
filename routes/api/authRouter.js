const express = require("express");
const authController = require("../../controllers/authControllers");
const { isBodyEmpty, authenticate, authenticateToken } = require("../../middlewares");
const { validateBody } = require("../../decorators");

const userSchemas = require("../../schemas/userSchemas");

const authRouter = express.Router();

authRouter.post(
  "/register",
  isBodyEmpty,
  validateBody(userSchemas.userRegisterSchema),
  authController.register
);

authRouter.post(
  "/login",
  isBodyEmpty,
  validateBody(userSchemas.userLoginSchema),
  authenticateToken,
  authController.login
);

authRouter.get("/current", authenticate, authController.current);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch("/subscription", authenticate, authController.subscription);

module.exports = authRouter;
