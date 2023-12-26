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
	"/users/register",
	upload.single("avatarURL"),
	isEmptyBody,
	validateBody(userSignupScheme),
    resizeAvatar,
	authController.singup
);

authRouter.post("/users/login", isEmptyBody, validateBody(userSigninScheme), authController.singin);

authRouter.post("/users/logout", authenticate, authController.signout);

authRouter.get("/users/current", authenticate, authController.getCurrent);

authRouter.patch(
	"/users",
	isEmptyBody,
	authenticate,
	validateBody(userUpdateSubscriptionScheme),
	authController.updateSubscription
);

authRouter.patch("/users/avatar", upload.single("avatarURL"), resizeAvatar, authenticate, authController.updateAvatar)

export default authRouter;
