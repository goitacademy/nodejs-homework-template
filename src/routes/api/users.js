const express = require('express');

const router = express.Router();

const { asyncWrapper } = require('../../helpers/apiHelpers');
const { authMiddleware } = require('../../middlewares/authMiddleware');

const {
  userDataValidation,
} = require('../../middlewares/userValidationMiddleware');

const AuthController = require('../../controllers/authController');

router.post(
  '/signup',
  userDataValidation,
  asyncWrapper(AuthController.registration)
);

router.post('/login', userDataValidation, asyncWrapper(AuthController.login));
router.post('/logout', authMiddleware, asyncWrapper(AuthController.logout));

module.exports = router;
