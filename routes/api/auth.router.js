import express from "express";
import authController from "../../controllers/auth.controller.js";
import {
  isEmptyBody,
  userValidateSignup,
  userValidateSignin,
  authenticate,
  userValidateSubscription,
} from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  userValidateSignup,
  authController.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  userValidateSignin,
  authController.signin
);

authRouter.post("/logout", authenticate, authController.signout);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch(
  "/",
  authenticate,
  isEmptyBody,
  userValidateSubscription,
  authController.updateSubscriptionUser
);

export default authRouter;
