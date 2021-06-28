import express from 'express';
import {
    registerController,
    loginController,
} from '../../controllers/authController.js';
// import {
//     registerValidation,
//     loginValidation,
// } from '../../middlewares/validationMiddleware.js';

const authRouter = new express.Router();

authRouter
    .post('/register', registerController)
    .post('/login', loginController);

export default authRouter;
