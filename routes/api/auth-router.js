import express from "express";

import { ctrlWrapper } from "../../decorators/index.js";

import {
  signup,
  signin,
  getCurrent,
  logout,
} from "../../controllers/auth-conrollers/index.js";

import { validateBody } from "../../decorators/index.js";

import usersSchemas from "../../schemas/users-schemas.js";

import { authenticate } from "../../middlewars/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(usersSchemas.userSignupSchema),
  ctrlWrapper(signup)
);

authRouter.post(
  "/login",
  validateBody(usersSchemas.userSigninSchema),
  ctrlWrapper(signin)
);

authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

export default authRouter;
