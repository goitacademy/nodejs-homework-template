import express from 'express';
import { asyncWrapper } from 'helpers/apiHelpers';
import {
  loginController,
  registerController,
  logoutController,
  currentUserController,
  updateUserSubscriptionController,
  updateUserAvatarController,
} from 'controllers/users.controller';
import { authValidation, avatarValidation, subscriptionValidation } from 'middlewares/users.validation.middleware';
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

export default authRouter;
