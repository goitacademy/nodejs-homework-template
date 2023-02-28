import express from 'express';
import { asyncWrapper } from 'helpers/apiHelpers';
import {
  loginController,
  registerController,
  logoutController,
  currentUserController,
  updateUserSubscriptionController,
  updateUserAvatarController,
  verifyController,
  sendVerifyMailController,
} from 'controllers/users.controller';
import {
  authValidation,
  avatarValidation,
  emailValidation,
  subscriptionValidation,
} from 'middlewares/users.validation.middleware';
import { authMiddleware } from 'middlewares/auth.middleware';
import { upload } from 'middlewares/fileUpload.middleware';

const authRouter = express.Router();

authRouter.post('/register', authValidation, asyncWrapper(registerController));
authRouter.post('/login', authValidation, asyncWrapper(loginController));
authRouter.post('/logout', authMiddleware, asyncWrapper(logoutController));
authRouter.get('/current', authMiddleware, asyncWrapper(currentUserController));
authRouter.patch('/', [authMiddleware, subscriptionValidation], asyncWrapper(updateUserSubscriptionController));
authRouter.patch(
  '/avatars',
  [authMiddleware, upload.single('avatar'), avatarValidation],
  asyncWrapper(updateUserAvatarController)
);
authRouter.get('/verify/:verificationToken', asyncWrapper(verifyController));
authRouter.post('/verify', emailValidation, asyncWrapper(sendVerifyMailController));

export default authRouter;
