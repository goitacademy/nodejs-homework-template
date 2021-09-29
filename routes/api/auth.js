const express = require('express');

const { joiSchema } = require('../../models/user');

const ctrl = require('../../controllers/auth');
const {
  validation,
  controllerWrapper,
  authenticate,
  upload,
} = require('../../middlewares');

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);

router.post(
  '/register',
  userValidationMiddleware,
  controllerWrapper(ctrl.register),
);

router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login));

router.get('/logout', authenticate, controllerWrapper(ctrl.logout));

router.get('/current', authenticate, controllerWrapper(ctrl.getCurrentUser));

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(ctrl.updateAvatar),
);

router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify));

module.exports = router;
