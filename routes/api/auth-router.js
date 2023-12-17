import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
import { validateBody } from "../../decorators/validateBody.js";
import { authenticate } from "../../middlewares/authenticate.js";
import {
  userSignInSchema,
  userSignUpSchema,
} from "../../validation-schemas/auth-schemas.js";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignUpSchema),
  authControllers.signUp
);

authRouter.post(
  "/login",
  validateBody(userSignInSchema),
  authControllers.logIn
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.signOut);
