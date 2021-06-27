const express = require('express');

const router = express.Router();

const { asyncWrapper } = require('../../helpers/apiHelpers');

const {
  userSignupValidation,
} = require('../../middlewares/userValidationMiddleware');

const AuthController = require('../../controllers/authController');

router.post(
  '/signup',
  userSignupValidation,
  asyncWrapper(AuthController.registration)
);

module.exports = router;
