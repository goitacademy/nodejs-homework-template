import express from "express";
import { userSigninSchema, userSignupSchema } from "../../models/User.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import authController from "../../controllers/auth-controller.js";
import validateBody from "../../decorators/validateBody.js";
import authenticate from "../../middlewares/autheticate.js";

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

export default authRouter;
