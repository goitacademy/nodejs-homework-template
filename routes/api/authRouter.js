import express from 'express';
import {
    registerController,
    loginController,
} from '../../controllers/authController.js';
import { authValidation } from '../../middlewares/validationMiddleware.js';
import { asyncWrapper } from '../../helpers/apiHelpers.js';
const authRouter = new express.Router();

authRouter
    .post('/register', authValidation, asyncWrapper(registerController))
    .post('/login', authValidation, asyncWrapper(loginController));

export default authRouter;
