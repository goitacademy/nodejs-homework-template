import express from "express";

import { validateBody, authenticate } from "../../middlewares";
import { authControllers } from "../../controllers";
import { schemas } from "../../models/user/user";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  authControllers.register
);

authRouter.get("/verify/:verificationCode", authControllers.verifyEmail);

authRouter.post(
  "/verify",
  validateBody(schemas.emailSchema),
  authControllers.resendVerifyEmail
);

authRouter.post(
  "/login",
  validateBody(schemas.loginSchema),
  authControllers.login
);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.patch("/subscription", authenticate, authControllers.subscription);

export default authRouter;
