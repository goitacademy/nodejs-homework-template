import express from "express";

import { validateBody, authenticate } from "../../middlewares/index.js";
import { authControllers } from "../../controllers/index.js";
import { schemas } from "../../models/user/user.js";

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
