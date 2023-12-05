import express from "express";
import { validateBody } from "../decorators/index.js";
import {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  userEmailSchema,
} from "../models/user.js";
import { authenticate, isEmptyBody, upload } from "../middlewares/index.js";
import authController from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  authController.register
);

authRouter.post("/login", validateBody(loginSchema), authController.login);

authRouter.get("/users/verify/:verificationCode", authController.verify);

authRouter.post(
  "/users/verify",
  isEmptyBody,
  validateBody(userEmailSchema),
  authController.resendVerify
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  authController.updateSubscription
);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;
