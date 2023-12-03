import express from "express";
import authController from "../../controllers/auth-controller.js";
import {
  authenticate,
  isEmptyBody,
  isValidId,
  upload,
} from "../../middlewares/index.js";
import { validaterBody } from "../../decorators/index.js";
import {
  userSigninSchema,
  userSignupSchema,
  updateSubscriptionSchema,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  isEmptyBody,
  validaterBody(userSignupSchema),
  authController.signup
);
authRouter.post(
  "/login",
  isEmptyBody,
  validaterBody(userSigninSchema),
  authController.signin
);
authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/subscription",
  authenticate,
  validaterBody(updateSubscriptionSchema),
  authController.updateSubscription
);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;
