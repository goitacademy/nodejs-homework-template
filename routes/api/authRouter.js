import express from "express";

import authController from "../../controllers/authControllers.js";
import validateBody from "../../decorators/validateBody.js";
import authenticate from "../../middlewares/Auth.js";
import isEmptyBody from "../../middlewares/IsemptyBody.js";
console.log(authController.signup);
import { userSignUpSchema, userSigninSchema } from "../../models/userModel.js";
import upload from "../../middlewares/upload.js";

const userSignupValidate = validateBody(userSignUpSchema);
const userSigninValidate = validateBody(userSigninSchema);

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

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;
