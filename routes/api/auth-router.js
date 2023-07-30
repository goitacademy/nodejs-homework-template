import express from 'express';

import { validateBody } from '../../decorators/index.js';
import usersSchema from '../../schemas/users-schemas.js';
import authController from '../../controllers/auth-controller.js';
import { authenticate } from '../../middlewars/index.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(usersSchema.userRegisterSchema),
  authController.register
);

authRouter.post(
  '/login',
  validateBody(usersSchema.userLoginSchema),
  authController.login
);

authRouter.get('/current', authenticate, authController.getCurrent);

export default authRouter;
