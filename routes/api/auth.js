import express from "express";
import authController from "../../controllers/auth.js";
import {isEmptyBody, authenticate} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userSignUpSchema } from "../../models/User.js";

const authRouter = express.Router();
const userSignUpValidate = validateBody(userSignUpSchema);
authRouter.post('/signup', isEmptyBody, userSignUpValidate, authController.signup)
authRouter.post('/signin', isEmptyBody, userSignUpValidate, authController.signin)
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/signout', authenticate, authController.signout);
export default authRouter;