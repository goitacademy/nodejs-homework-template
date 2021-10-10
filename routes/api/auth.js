const express = require('express');

const router = express.Router();

const { yupUserSchema } = require('../../models/user');
const ctrl = require('../../controllers/auth');
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares');

router.post(
  '/signup',
  validation(yupUserSchema),
  controllerWrapper(ctrl.signup),
);
router.post('/login', validation(yupUserSchema), controllerWrapper(ctrl.login));
router.get('/logout', authenticate, controllerWrapper(ctrl.logout));
// router.get('/current', authenticate, controllerWrapper(authController.current));

module.exports = router;
