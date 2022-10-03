const express = require('express');
const asyncHandler = require('express-async-handler');

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  avatarUserController,
} = require('../controllers/authControllser')

const {
  authMiddleware
} = require('../middlewares/authMiddleware');
const {
  uploadMiddleware
} = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.post('/users/signup', asyncHandler(registrationController));
router.post('/users/login', asyncHandler(loginController));
router.post('/users/logout', asyncHandler(authMiddleware), asyncHandler(logoutController));

router.post('/users/current', asyncHandler(authMiddleware), asyncHandler(currentUserController));
router.post('/users/avatars', asyncHandler(authMiddleware), uploadMiddleware, asyncHandler(avatarUserController));
  
module.exports = router