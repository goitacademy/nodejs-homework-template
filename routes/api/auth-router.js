/** @format */

import express from "express";

import { validateBody } from "../../decorators/index.js";

import { userSignupSchema, userSigninSchema } from "../../models/User.js";

import authController from "../../controllers/auth-controller.js";

import { authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/users/register",
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/users/login",
  validateBody(userSigninSchema),
  authController.login
);

authRouter.get("/users/current", authenticate, authController.getCurrent);

authRouter.post("/users/logout", authenticate, authController.logout);

export default authRouter;
