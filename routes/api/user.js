const express = require('express');
const router = express.Router();
const { authGuard } = require('../../middlewares/authGuard');
const { uploadAvatar } = require('../../helpers/multer');

const {
  signupController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateUserSubscriptionController,
  updateUserAvatarController,
  verificationUserTokenController,
  resendVerificationTokenController
} = require('../../controllers/users');

const {
  validateCreateUser,
  validateUpdateUserSubscription,
  validateResendVerificationEmail
} = require('../../validation/validation');


const { asyncWrapper } = require('../../helpers/apiHelpers');

router.post('/signup', validateCreateUser, asyncWrapper(signupController));

router.post('/login', validateCreateUser, asyncWrapper(loginController));

router.post('/logout', asyncWrapper(logoutController));

router.post(
  '/verify',
  validateResendVerificationEmail,
  asyncWrapper(resendVerificationTokenController)
);

router.get('/current', authGuard, asyncWrapper(getCurrentUserController));

router.get(
  '/verify/:verificationToken',
  asyncWrapper(verificationUserTokenController)
);

router.patch(
  '/subscription',
  authGuard,
  validateUpdateUserSubscription,
  asyncWrapper(updateUserSubscriptionController)
);

router.patch(
  '/avatars',
  authGuard,
  uploadAvatar.single('avatar'),
  asyncWrapper(updateUserAvatarController)
);

module.exports = router
