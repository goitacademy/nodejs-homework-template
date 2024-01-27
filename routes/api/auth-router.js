import express from "express";

import authController from "../../controllers/auth-controller.js";

import { isEmptyBody, authenticate, upload } from "../../middlewares/index.js";

import {validateBody} from "../../decorators/index.js";

import { userSignupSchema, userSigninSchema, userUpdateSubscription, userEmailSchema } from "../../models/Users.js";

const authRouter = express.Router()

authRouter.post("/register", isEmptyBody, validateBody(userSignupSchema), authController.signup);

authRouter.get("/verify/:verificationCode", authController.verify)

authRouter.post("/verify", isEmptyBody, validateBody(userEmailSchema), authController.resendVerifyEmail);

authRouter.post("/login", isEmptyBody, validateBody(userSigninSchema), authController.signin);

authRouter.patch("/users", authenticate, isEmptyBody, validateBody(userUpdateSubscription), authController.subscriptionUpdate);

authRouter.patch("/avatars", upload.single("avatar"), authenticate, authController.avatarUpdate);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);

export default authRouter;