import express from "express"

import authController from "../controllers/auth-controller.js"

import { isEmptyBody}  from "../middlewares/index.js";
import validateBody from "../decorators/validateBody.js";

import { userSigninScheme, userSignupScheme, userUpdateSubscriptionScheme } from "../models/user.js";
import authenticate from "../middlewares/authenticate.js";



const authRouter = express.Router()

authRouter.post('/register', isEmptyBody, validateBody(userSignupScheme), authController.singup)

authRouter.post('/login', isEmptyBody, validateBody(userSigninScheme), authController.singin)

authRouter.post('/logout', authenticate, authController.signout)

authRouter.get('/current', authenticate,  authController.getCurrent)

authRouter.patch('/', isEmptyBody, authenticate, validateBody(userUpdateSubscriptionScheme), authController.updateSubscription)

export default authRouter