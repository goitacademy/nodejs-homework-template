import express from 'express';
import auth from '../helpers/user.auth.js';
import {
  createNewUser,
  deleteUser,
  loginUser,
  logoutUser,
  getCurrentUserDataFromToken,
  updateUserSubscriptionStatus,
  checkFileBeforeUpload,
  updateUserAvatar,
  verifyUserByVerificationToken,
  resendEmailWithVerificationToken,
} from '../controller/users.controller.js';
import upload from '../config/multer.config.js';

const usersRouter = express.Router();

usersRouter.post('/signup', createNewUser);

usersRouter.delete('/delete', auth, deleteUser);

usersRouter.post('/login', loginUser);

usersRouter.get('/logout', auth, logoutUser);

usersRouter.get('/current', auth, getCurrentUserDataFromToken);

usersRouter.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  checkFileBeforeUpload,
  updateUserAvatar,
);

usersRouter.get('/verify/:verificationToken', verifyUserByVerificationToken);

usersRouter.post('/verify/', resendEmailWithVerificationToken);

usersRouter.patch('/', auth, updateUserSubscriptionStatus);

export default usersRouter;
