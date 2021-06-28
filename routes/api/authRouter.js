import express from 'express';
import {
    registerController,
    loginController,
} from '../../controllers/authController.js';
import { authValidation } from '../../middlewares/validationMiddleware.js';

const authRouter = new express.Router();

authRouter
    .post('/register', authValidation, registerController)
    .post('/login', authValidation, loginController);

export default authRouter;
