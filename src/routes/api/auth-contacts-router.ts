import express from "express";
import authController from "../../controllers/auth-controller";
import { authentication, isEmptyBody, upload } from "../../middlewares/index";
import { validateBodyRequest } from "../../decorators/index";
import {
  userSignupSchema,
  userSigninSchema,
  repeadUserVerifySchema,
  userUpdateSubcsriptionSchema,
} from "../../models/User";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBodyRequest(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBodyRequest(userSigninSchema),
  authController.signin
);

authRouter.get("/current", authentication, authController.current);

authRouter.get("/verify/:verificationToken", authController.verifyEmail);

authRouter.post(
  "/verify",
  isEmptyBody,
  validateBodyRequest(repeadUserVerifySchema),
  authController.repeadVerify
);

authRouter.post("/signout", authentication, authController.signout);

authRouter.patch(
  "/",
  isEmptyBody,
  authentication,
  validateBodyRequest(userUpdateSubcsriptionSchema),
  authController.subscription
);

authRouter.patch(
  "/avatars",
  authentication,
  upload.single("avatarURL"),
  authController.updateAvatar
);

export default authRouter;
