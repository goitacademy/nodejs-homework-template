/** @format */

import express from "express";

import { validateBody } from "../../decorators/index.js";

import {
  userSignupSchema,
  userSigninSchema,
  // updateAvatarUserSchema,
} from "../../models/User.js";

import authController from "../../controllers/auth-controller.js";

import { authenticate, upload } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/users/register",
  upload.single("avatar"),
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

authRouter.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatarUser
);

export default authRouter;
