import express from 'express';
import ctrl from 'controllers/users.controller';
import mdlw from 'middlewares/users.validation';
import { authMiddleware } from 'middlewares/auth';
import { upload } from 'middlewares/fileUpload';

const authRouter = express.Router();

authRouter.post('/register', mdlw.auth, ctrl.register);
authRouter.post('/login', mdlw.auth, ctrl.login);
authRouter.post('/logout', authMiddleware, ctrl.logout);
authRouter.get('/current', authMiddleware, ctrl.currentUser);
authRouter.patch('/', [authMiddleware, mdlw.subscription], ctrl.updateUserSubscription);
authRouter.patch('/avatars', [authMiddleware, upload.single('avatar'), mdlw.avatar], ctrl.updateUserAvatar);
authRouter.get('/verify/:verificationToken', ctrl.verify);
authRouter.post('/verify', mdlw.email, ctrl.sendVerifyMail);

export default authRouter;
