import express from "express";

import authController from "../controllers/auth-controller.js";

import { isEmptyBody } from "../middlewares/index.js";
import validateBody from "../decorators/validateBody.js";

import { userSigninScheme, userSignupScheme, userUpdateSubscriptionScheme } from "../models/user.js";
import authenticate from "../middlewares/authenticate.js";
import  upload  from "../middlewares/upload.js";
import resizeAvatar from "../middlewares/reseizeAvatar.js";

const authRouter = express.Router();

authRouter.post(
	"/register",
	upload.single("avatarURL"),
	isEmptyBody,
	validateBody(userSignupScheme),
    resizeAvatar,
	authController.singup
);

authRouter.post("/login", isEmptyBody, validateBody(userSigninScheme), authController.singin);

authRouter.post("/logout", authenticate, authController.signout);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch(
	"/",
	isEmptyBody,
	authenticate,
	validateBody(userUpdateSubscriptionScheme),
	authController.updateSubscription
);

authRouter.patch("/avatars", upload.single("avatarURL"), resizeAvatar, authenticate, authController.updateAvatar)

export default authRouter;
