import express from "express";
import * as authController from "../../controllers/auth-controllers/index.js";
import { isEmptyBody, authenticate } from "../../middelwares/index.js";
import validateBody from "../../decorators/validaterBody.js";
import {
  userSignupSchema,
  userSigninSchema,
  userUpdateSchema,
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

authRouter.post("/logout", authenticate, authController.logout);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(userUpdateSchema),
  authController.updateUser
);

export default authRouter;
