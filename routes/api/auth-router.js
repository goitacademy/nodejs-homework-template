import express from "express";

import authController from "../../controllers/auth-controller.js";

import usersSchemas from "../../schemas/users-schemas.js";

import { validateBody } from "../../decorators/index.js";

import { authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(usersSchemas.userSignupSchema),
  authController.signup
);

authRouter.post(
  "/login",
  validateBody(usersSchemas.userSignupSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);

export default authRouter;
