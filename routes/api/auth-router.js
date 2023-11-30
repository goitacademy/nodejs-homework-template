import express from "express";
import { authController } from "../../controllers/index.js";
import { validate } from "../../decorators/index.js";
import { subscription, userSingIn, userSingUp } from "../../models/users.js";
import { authenticate } from "../../middlewares/index.js";

const userSingUpValidate = validate(userSingUp);
const userSingInValidate = validate(userSingIn);
const userSubscription = validate(subscription);

const authRouter = express.Router();

authRouter.post("/register", userSingUpValidate, authController.signUp);
authRouter.post("/login", userSingInValidate, authController.signIn);
authRouter.get("/current", authenticate, authController.current);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.patch(
  "/patchSubscription",
  userSubscription,
  authenticate,
  authController.subscription
);

export default authRouter;
