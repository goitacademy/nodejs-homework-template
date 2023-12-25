import express from "express";

import authController from "../../controllers/auth-controller.js";

import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";

import {
  userSigninSchema,
  userSignupSchema,
  userSubscriptionSchema,
  userAvatarSchema,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);

authRouter.patch(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(userSubscriptionSchema),
  authController.updateUserSubscription
);

authRouter.patch(
  "/avatars",
  upload.single("avatarURL"),
  authenticate,
  validateBody(userAvatarSchema),
  authController.updateAvatar
);

export default authRouter;
