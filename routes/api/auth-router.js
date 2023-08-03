import express from "express";
import validateBody from "../../decorators/validateBody.js";

import authController from "../../controllers/auth-controller.js";

import usersSchemas from "../../schemas/users-schemas.js";

import { authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(usersSchemas.userSingupSchema),
  authController.signup
);

authRouter.post(
  "/login",
  validateBody(usersSchemas.userLogInSchema),
  authController.login
);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.get("/current", authenticate, authController.getCurrent);

export default authRouter;
