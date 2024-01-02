import express from "express";

import authController from "../../controllers/auth-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";


const authRouter = express.Router();

authRouter.post('/signup', isEmptyBody, authController.signUp);
authRouter.post('/signin', isEmptyBody, authController.signIn);


export default authRouter;