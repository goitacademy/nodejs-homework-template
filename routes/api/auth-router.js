import express from 'express';

import { validateBody } from '../../decorators/index.js';
import usersSchema from '../../schemas/users-schemas.js';
import authController from '../../controllers/auth-controller.js';

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

export default authRouter;
