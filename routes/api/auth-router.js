import express from "express";

import authController from "../../controllers/auth-controller.js";

import authenticate from "../../middlewars/authenticate.js";

import validateBody from "../../decorators/validateBody.js";
import usersSchemas from "../../schemas/user-schemas.js";
const authRouter = express.Router();

authRouter.post(
  "/users/register",
  validateBody(usersSchemas.userSignupSchema),
  authController.signup
);
authRouter.post(
  "/users/login",
  validateBody(usersSchemas.userSigninSchema),
  authController.signin
);
authRouter.get("/users/current", authenticate, authController.getCurrent);
authRouter.post("/users/logout", authenticate, authController.signout);

export default authRouter;
