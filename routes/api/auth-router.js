import express from "express";

import authController from "../../controllers/auth-controller.js";
import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";


const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, authController.signUp);
authRouter.get('/verify/:verificationToken', authController.verify);
authRouter.post('/verify', isEmptyBody, authController.resendVerify);
authRouter.post('/login', isEmptyBody, authController.signIn);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/logout', authenticate, authController.signOut);
authRouter.patch('/subscription', authenticate, isEmptyBody, authController.updateSubs);
authRouter.patch('/avatars', authenticate, upload.single('avatar'), authController.updateAvatar);


export default authRouter;