import express from 'express';

import authController from '../../controllers/auth-controller.js';
import { isEmptyBody, authenticate, upload } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import {
  userSignSchema,
  userEmailSchema,
  userUpdateSubscriptionSchema,
} from '../../models/User.js';

// ============================================================

const authRouter = express.Router();

authRouter.post(
  '/register',
  isEmptyBody,
  validateBody(userSignSchema),
  authController.register
);

authRouter.get('/verify/:verificationToken', authController.verify);

authRouter.post(
  '/verify',
  isEmptyBody,
  validateBody(userEmailSchema),
  authController.repeatVerify
);

authRouter.post(
  '/login',
  isEmptyBody,
  validateBody(userSignSchema),
  authController.login
);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/logout', authenticate, authController.logout);

authRouter.patch(
  '/',
  authenticate,
  validateBody(userUpdateSubscriptionSchema),
  authController.changeSubscription
);

authRouter.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  authController.changeAvatar
);

export default authRouter;
