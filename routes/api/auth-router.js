import express from "express";
import { isEmptyBody } from "../../middlewares/isEmptyBody.js";
import authController from "../../controllers/auth-controller.js";
import validateBody from "../../decorators/validateBody.js";
import { userSigninSchema, userSignupSchema } from "../../models/User.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/upload.js";



export const authRouter = express.Router();

authRouter.post("/register",upload.single("avatar"), isEmptyBody, validateBody(userSignupSchema), authController.signup);
authRouter.post("/login", isEmptyBody, validateBody(userSigninSchema), authController.signin)
authRouter.post("/logout", authenticate,authController.logout)
authRouter.get("/current", authenticate, authController.getCurrent )
authRouter.patch("/avatars",authenticate, upload.single("avatar"), authController.updateAvatar)