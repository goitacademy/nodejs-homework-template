import express from 'express';
import {
    registerController,
    loginController,
    currentUserController,
    logoutController,
} from '../../controllers/authController.js';
import { authValidation } from '../../middlewares/validationMiddleware.js';
import { asyncWrapper } from '../../helpers/apiHelpers.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
const authRouter = new express.Router();

authRouter
    .post('/register', authValidation, asyncWrapper(registerController))
    .post('/login', authValidation, asyncWrapper(loginController))
    .post('/logout', authMiddleware, asyncWrapper(logoutController))
    .get('/current', authMiddleware, asyncWrapper(currentUserController));

export default authRouter;
