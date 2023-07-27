import express from "express";

import { validateBody } from "../../decorators/index.js";

import authControllers from "../../controllers/auth-controllers.js";

import usersSchemas from "../../Schemas/users-schemas.js";

import authenticate from "../../middlewares/authenticate.js";

const authRouter = express.Router();
authRouter.post(
  "/signup",
  validateBody(usersSchemas.userSignupSchema),
  authControllers.signup
);
authRouter.post(
  "/signin",
  validateBody(usersSchemas.userSignInSchema),
  authControllers.signin
);
authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.post("/signout", authenticate, authControllers.signout);
export default authRouter;
