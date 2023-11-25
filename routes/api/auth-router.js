import express from "express";
import * as authController from "../../controllers/auth-controllers/index.js";
import { isEmptyBody } from "../../middelwares/index.js";
import validateBody from "../../decorators/validaterBody.js";
import {
  userSignupSchema,
  userSigninSchema,
} from "../../schemas/user-schemas.js";

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

export default authRouter;
