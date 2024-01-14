import express from 'express';

import authController from '../../controllers/auth-controller.js';
import {
  isEmptyBody,
  isValidId,
  isEmptyStatus,
  authenticate,
  upload,
} from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { userSignSchema, userUpdateSubscriptionSchema } from '../../models/User.js';

// ============================================================

const authRouter = express.Router();

authRouter.post(
  '/register',
  upload.single('avatar'),
  isEmptyBody,
  validateBody(userSignSchema),
  authController.register
);
authRouter.post('/login', isEmptyBody, validateBody(userSignSchema), authController.login);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/logout', authenticate, authController.logout);
authRouter.patch(
  '/patch',
  authenticate,
  validateBody(userUpdateSubscriptionSchema),
  authController.patch
);

export default authRouter;
