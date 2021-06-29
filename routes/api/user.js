const express = require('express');
const router = express.Router();
const { authGuard } = require('../../middlewares/authGuard');

const {
  signupController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateUserSubscriptionController
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

module.exports = router
