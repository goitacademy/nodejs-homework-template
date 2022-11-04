const express = require('express');
const ctrl = require('../../controllers/user');
const { auth } = require('../../middlewares');

const router = express.Router();

const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares');
const { joiUserSchema } = require('../../models/user');

router.post(
  '/signup',
  validateBody(joiUserSchema.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  '/login',
  validateBody(joiUserSchema.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  '/',
  auth,
  validateBody(joiUserSchema.updateSubscription),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
