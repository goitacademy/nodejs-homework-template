import express from 'express';
import { asyncWrapper } from 'helpers/apiHelpers';
import {
  loginController,
  registerController,
  logoutController,
  currentUserController,
  updateUserSubscriptionController,
} from 'controllers/users.controller';
import { authValidation, subscriptionValidation } from 'middlewares/users.validation.middleware';
import { authMiddleware } from 'middlewares/auth.middleware';

const authRouter = express.Router();

authRouter.post('/register', authValidation, asyncWrapper(registerController));
authRouter.post('/login', authValidation, asyncWrapper(loginController));
authRouter.post('/logout', authMiddleware, asyncWrapper(logoutController));
authRouter.get('/current', authMiddleware, asyncWrapper(currentUserController));
authRouter.patch('/', [authMiddleware, subscriptionValidation], asyncWrapper(updateUserSubscriptionController));

export default authRouter;
