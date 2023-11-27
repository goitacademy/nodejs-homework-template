import express from "express";
import authController from "../../controllers/auth-controller.js";
import { authenticate, isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userSignupSchema,
  userSigninSchema,
  userSubscriptionSchema,
} from "../../models/User.js";
const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(userSubscriptionSchema),
  authController.updateSubscription
);

export default authRouter;
