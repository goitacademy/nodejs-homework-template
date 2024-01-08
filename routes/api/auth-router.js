import express from "express";

import authController from "../../controllers/auth-controller.js";
import { authenticate, isEmptyBody } from "../../middlewares/index.js";


const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, authController.signUp);
authRouter.post('/login', isEmptyBody, authController.signIn);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/logout', authenticate, authController.signOut);
authRouter.patch('/subscription', authenticate, isEmptyBody, authController.updateSubs);


export default authRouter;