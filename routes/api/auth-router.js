import express from "express";
import authController from "../../controllers/auth-controller.js";
import { validateBody } from "../../decorator/index.js";
import usersSchemas from "../../schemas/users-schemas.js";
import { authenticate } from "../../middlewars/index.js";

const authRouter = express.Router();

authRouter.post(
  "/registered",
  validateBody(usersSchemas.userSignupSchema),
  authController.registered
);

authRouter.post(
  "/login",
  validateBody(usersSchemas.userSigninSchema),
  authController.login
);

authRouter.get("/current", authenticate, authController.current);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
