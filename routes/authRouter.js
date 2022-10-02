const express = require('express');
const asyncHandler = require('express-async-handler');

const {
  registrationController,
  loginController,
  currentUserController,
  logoutController
} = require('../controllers/authControllser')

const {
  authMiddleware
} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/users/signup', asyncHandler(registrationController));
router.post('/users/login', asyncHandler(loginController));

router.use(asyncHandler(authMiddleware));

router.post('/users/current', asyncHandler(currentUserController));
router.post('/users/logout', asyncHandler(logoutController));
  
module.exports = router