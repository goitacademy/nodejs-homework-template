const express = require("express");
const authController = require("../../controllers/authControllers");
const { isBodyEmpty, authenticate, upload } = require("../../middlewares");
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
  authController.login
);

authRouter.get("/current", authenticate, authController.current);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch("/subscription", authenticate, authController.subscription);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  authController.updateAvatar
);

module.exports = authRouter;
