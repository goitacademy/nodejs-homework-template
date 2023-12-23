import express from "express"

import authController from "../controllers/auth-controller.js"

import { isEmptyBody} from "../middlewares/index.js";
import validateBody from "../decorators/validateBody.js";

import { userSigninScheme, userSignupScheme } from "../models/user.js";

const authRouter = express.Router()

authRouter.post('/signup', isEmptyBody, validateBody(userSignupScheme), authController.singup)

authRouter.post('/signin', isEmptyBody, validateBody(userSigninScheme), authController.singin)

export default authRouter