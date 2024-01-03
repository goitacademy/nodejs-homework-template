import express from "express";

import authController from "../../controllers/auth-controller.js";
import { authenticate, isEmptyBody } from "../../middlewares/index.js";


const authRouter = express.Router();

authRouter.post('/signup', isEmptyBody, authController.signUp);
authRouter.post('/signin', isEmptyBody, authController.signIn);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/signout', authenticate, authController.signOut);
authRouter.patch('/subscription', authenticate, isEmptyBody, authController.updateSubs);


export default authRouter;