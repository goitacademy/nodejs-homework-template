import express from "express";

import authController from "../../controllers/auth-controller.js";

import { authenticate, isEmptyBody } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import { userSingupSchema, userSinginSchema } from "../../models/User.js";

const userSingupValidate = validateBody(userSingupSchema);
const userSinginValidate = validateBody(userSinginSchema);

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  userSingupValidate,
  authController.singup
);

authRouter.post(
  "/login",
  isEmptyBody,
  userSinginValidate,
  authController.singin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.singnout);

export default authRouter;
