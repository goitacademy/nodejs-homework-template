import express from 'express';
import { asyncWrapper } from 'helpers/apiHelpers';
import {
  loginController,
  registerController,
  logoutController,
  currentUserController,
} from 'controllers/users.controller';
import { authValidation } from 'middlewares/users.validation.middleware';
import { authMiddleware } from 'middlewares/auth.middleware';

const authRouter = express.Router();

authRouter.post('/register', authValidation, asyncWrapper(registerController));
authRouter.post('/login', authValidation, asyncWrapper(loginController));
authRouter.post('/logout', authMiddleware, asyncWrapper(logoutController));
authRouter.get('/current', authMiddleware, asyncWrapper(currentUserController));

export default authRouter;
