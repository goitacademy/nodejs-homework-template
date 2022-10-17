const express = require('express');

const router = express.Router();

const {
  validateBody,
  ctrlWrapper,
  authenticate,
} = require('../../middlewares');
const { contactsControllers: ctrl } = require('../../controllers');
const { schemas } = require('../../models/user');

router.post(
  '/signup',
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
