import  express  from "express";

import authController from "../../controllers/auth-controller.js";

import isEmptyBody from "../../midllewares/isEmptyBody.js";

import validateBody from "../../decorators/validateBody.js";

import { userSignUpSchema, userSigninSchema } from "../../models/user.js";


const userSignUpValidate = validateBody(userSignUpSchema);

const userSignInSchema = validateBody(userSigninSchema);

const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, userSignUpValidate, authController.signUp)

authRouter.post('/login', isEmptyBody, userSignInSchema, authController.signIn)

export default authRouter;

