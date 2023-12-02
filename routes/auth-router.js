import express from "express";
import { validateBody } from "../decorators/index.js";
import {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} from "../models/user.js";
import { authenticate, upload } from "../middlewares/index.js";
import authController from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  authController.register
);

authRouter.post("/login", validateBody(loginSchema), authController.login);

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
