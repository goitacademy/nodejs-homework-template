import express from 'express';
import {
    registerController,
    loginController,
    currentUserController,
    logoutController,
    changeAvatarController,
} from '../../controllers/authController.js';
import { authValidation } from '../../middlewares/validationMiddleware.js';
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
    );

export default authRouter;
