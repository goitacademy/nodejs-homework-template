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
  updateUserAvatarController
} = require('../../controllers/users');

const {
  validateCreateUser,
  validateUpdateUserSubscription,
} = require('../../validation/validation');


const { asyncWrapper } = require('../../helpers/apiHelpers');

router.post('/signup', validateCreateUser, asyncWrapper(signupController));

router.post('/login', validateCreateUser, asyncWrapper(loginController));

router.post('/logout', asyncWrapper(logoutController));

router.get('/current', authGuard, asyncWrapper(getCurrentUserController));

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
