const express = require('express');

const { joiSchema } = require('../../models/user');
const {
  validation,
  controllerWrapper,
  authenticate,
  upload,
} = require('../../middlewares');
const ctrl = require('../../controllers/auth');

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);

router.post(
  '/register',
  userValidationMiddleware,
  controllerWrapper(ctrl.register),
);

router.post('/login', userValidationMiddleware, ctrl.login);
// router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login));

router.get('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.getCurrentUser);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar,
);

module.exports = router;
