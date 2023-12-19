import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
import { validateBody } from "../../decorators/validateBody.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { upload } from "../../middlewares/upload.js";
import {
  userEmailSchema,
  userSignInSchema,
  userSignUpSchema,
} from "../../validation-schemas/auth-schemas.js";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignUpSchema),
  authControllers.signUp
);

authRouter.get("/verify/:verificationToken", authControllers.verify);

authRouter.post(
  "/verify",
  validateBody(userEmailSchema),
  authControllers.resendVerify
);

authRouter.post(
  "/login",
  validateBody(userSignInSchema),
  authControllers.logIn
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.signOut);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateUserAvatar
);
