import express from "express";
import { validateBody } from '../../decorators/index.js';
import userSchemas from "../../schemas/users-schemas.js";
import authController from "../../controllers/auth-controller.js";
import {authenticate, upload} from "../../middlewars/index.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchemas.userSignupSchema), authController.signup);
authRouter.get("/verify/:verificationToken", authController.verifyEmail)
authRouter.post("/verify", validateBody(userSchemas.userEmailSchema), authController.resendVerifyEmail)
authRouter.post("/login", validateBody(userSchemas.userSigninSchema), authController.signin);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar)


export default authRouter;