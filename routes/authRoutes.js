const express = require('express');

const validation = require('../Middlewares/validationMiddlewares');
const { schema } = require('../models/user.models');
const { users: ctrl } = require('../controlers');
const authenticate = require('../Middlewares/authMiddlewares');
const upload = require('../Middlewares/multerMiddlewares');
const authController = require('../controlers/auth/index');

const router = express.Router();

router.post(
  "/register",
  validation.registerValid(schema.registerSchema),
  ctrl.register
);

router.post("/login", validation.loginValid(schema.loginSchema), ctrl.login);

router.post('/forgot-password', authController.forgotPassword);

router.post("/logout", authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.getCurrent);

router.patch(
  "/avatars",
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);

router.patch('/reset-password/:otp', authController.resetPassword);

module.exports = router;