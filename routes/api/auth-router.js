import  express  from "express";

import authController from "../../controllers/auth-controller.js";

import isEmptyBody from "../../midllewares/isEmptyBody.js";

import validateBody from "../../decorators/validateBody.js";

import authenticate from "../../midllewares/authenticate.js";

import { userSignUpSchema, userSigninSchema, userEmailSchema } from "../../models/user.js";
import upload from "../../midllewares/upload.js";

const userSignUpValidate = validateBody(userSignUpSchema);

const userSignInSchema = validateBody(userSigninSchema);

const userEmailValidate = validateBody(userEmailSchema);

const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, userSignUpValidate, authController.signUp)

authRouter.post('/login', isEmptyBody, userSignInSchema, authController.signIn)

authRouter.post('/logout', authenticate, authController.signout)

authRouter.get('/current', authenticate, authController.getCurrent );

authRouter.post('/verify', isEmptyBody,
userEmailValidate, authController.resendVerifyEmail  )

authRouter.patch(
    "/avatars",
    authenticate,
    upload.single("avatar"),
    authController.updateAvatar
);

authRouter.get('/verify/:verificationCode', authController.verify);

export default authRouter;

