import express from 'express';
import authControllers from '../../controllers/auth-controllers.js';
const authRouter = express.Router();
import { authenticate, isEmptyBody } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import {
  userRegisterSchema,
  userLoginSchema,
} from '../../models/auth-users.js';

authRouter.post(
  '/register',
  isEmptyBody,
  validateBody(userRegisterSchema),
  authControllers.register
);

authRouter.post(
  '/login',
  isEmptyBody,
  validateBody(userLoginSchema),
  authControllers.login
);

authRouter.post('/logout', authenticate, authControllers.logout);

export default authRouter;
