import express from "express";
import { authController } from "../../controllers/index.js";
import { validate } from "../../decorators/index.js";
import {
  subscription,
  userEmailSchema,
  userSingIn,
  userSingUp,
} from "../../models/users.js";
import { authenticate, upload } from "../../middlewares/index.js";

const userSingUpValidate = validate(userSingUp);
const userSingInValidate = validate(userSingIn);
const userSubscription = validate(subscription);
const userEmailValidate = validate(userEmailSchema);

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

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);
authRouter.get("/verify/:verificationToken", authController.verify);
authRouter.post("/verify", userEmailValidate, authController.resendEmail);

export default authRouter;
