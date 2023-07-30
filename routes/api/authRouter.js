import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { usersSchemas as schemas } from '../../schemas/index.js';
import { authController as controller } from '../../controllers/index.js';
import { authenticate } from '../../middleware/index.js';

// ####################################################

const authRouter = express.Router();

authRouter.post(
  '/signup',
  validateBody(schemas.signupSchema),
  controller.signup
);

authRouter.post(
  '/signin',
  validateBody(schemas.signinSchema),
  controller.signin
);

authRouter.get('/current', authenticate, controller.getCurrent);

authRouter.post('/signout', authenticate, controller.signout);

export default authRouter;
