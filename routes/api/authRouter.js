import express from "express";

import authController from "../../controllers/authControllers.js";
import validateBody from "../../decorators/validateBody.js";
import authenticate from "../../middlewares/Auth.js";
import isEmptyBody from "../../middlewares/IsemptyBody.js";

import {
  userEmailSchema,
  userSignUpSchema,
  userSigninSchema,
} from "../../models/userModel.js";
import upload from "../../middlewares/upload.js";

const userSignupValidate = validateBody(userSignUpSchema);
const userSigninValidate = validateBody(userSigninSchema);
const userEmailValidate = validateBody(userEmailSchema);

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  userSignupValidate,
  authController.signup
);
authRouter.post(
  "/login",
  isEmptyBody,
  userSigninValidate,
  authController.signin
);

authRouter.get("/verify/:verificationCode", authController.verify);
authRouter.post(
  "/verify",
  isEmptyBody,
  userEmailValidate,
  authController.resendVerifyEmail
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;
