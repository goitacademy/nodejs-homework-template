import express from 'express';
import {
    registerController,
    loginController,
    currentUserController,
    logoutController,
    changeAvatarController,
    emailVerificationController,
    emailVerificationRepeatController,
} from '../../controllers/authController.js';
import {
    authValidation,
    verifyEmailValidation,
} from '../../middlewares/validationMiddleware.js';
import { asyncWrapper } from '../../helpers/apiHelpers.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { uploadMiddleware } from './filesRouter.js';
const authRouter = new express.Router();

authRouter
    .post('/register', authValidation, asyncWrapper(registerController))
    .post('/login', authValidation, asyncWrapper(loginController))
    .post('/logout', authMiddleware, asyncWrapper(logoutController))
    .get('/current', authMiddleware, asyncWrapper(currentUserController))
    .patch(
        '/avatars',
        [authMiddleware, uploadMiddleware.single('avatar')],
        asyncWrapper(changeAvatarController),
    )
    .get(
        '/verify/:verificationToken',
        asyncWrapper(emailVerificationController),
    )
    .post(
        '/verify',
        verifyEmailValidation,
        asyncWrapper(emailVerificationRepeatController),
    );

export default authRouter;
