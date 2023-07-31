import express from "express";
import validateBody from "../../middleware/validateBody.js";
import schema from "../../models/user.js"
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import authController from "../../controllers/auth-controller.js";
import authenticate from "../../middleware/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(schema.userSignupSchema),
  authController.signup
);

authRouter.post(
  "/login",
  validateBody(schema.userSigninSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;