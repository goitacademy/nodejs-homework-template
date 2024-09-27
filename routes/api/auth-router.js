import express from "express";

import authController from "../../controllers/auth-controller.js";

import { isEmptyBody, authenticate } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import { userSingUpSchema, userSingInSchema } from "../../models/User.js";

const authRouter = express.Router();

const userSingUpValidate = validateBody(userSingUpSchema);
const userSingInValidate = validateBody(userSingInSchema);

authRouter.post(
  "/register",
  isEmptyBody,
  userSingUpValidate,
  authController.register
);
authRouter.post(
  "/login",
  isEmptyBody,
  userSingInValidate,
  authController.login
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
