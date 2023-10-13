import express from "express";
import authController from "../../controllers/auth-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
import validateBody from "../../decorators/validateBody.js";
import { userSignUpSchema, userSignInSchema } from "../../models/User.js";

const userSignUpValidate = validateBody(userSignUpSchema);
const userSignInValidate = validateBody(userSignInSchema);
const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  userSignUpValidate,
  authController.signUp
);
authRouter.post(
  "/signin",
  isEmptyBody,
  userSignInValidate,
  authController.signIn
);
export default authRouter;
