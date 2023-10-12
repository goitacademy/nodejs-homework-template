import express from "express";
import authController from "../../controllers/auth-controller.js";

import { authenticate, isEmptyBody } from "../../middlewars/index.js"

import { validateBody } from "../../decorators/index.js";

import { userSignSchema, userUpdateSubscriotion } from "../../models/user.js";

const userSignValidate = validateBody(userSignSchema);
const userUpdateSubscriptionValidate = validateBody(userUpdateSubscriotion)

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, userSignValidate, authController.signup);

authRouter.post("/login", isEmptyBody, userSignValidate, authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);

authRouter.patch("/subscription", authenticate, isEmptyBody, userUpdateSubscriptionValidate, authController.updateSubscriotion)

export default authRouter;