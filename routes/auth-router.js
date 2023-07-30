import express from 'express';

import authController from '../controllers/auth-controller.js';
import { validateBody } from '../decorators/index.js';
import usersSchemas from '../schemas/users-schemas.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(usersSchemas.userRegisterSchema),
  authController.register
);

authRouter.post(
  '/login',
  validateBody(usersSchemas.userLoginSchema),
  authController.login
);

export default authRouter;
