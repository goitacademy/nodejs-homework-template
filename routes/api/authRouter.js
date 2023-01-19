const express = require('express');

const {
  authMiddleware,
  validation,
  controllerWrapper,
} = require('../../Middlewares');
const { auth: ctrl } = require('../../Controllers');
const {
  joiSingupSchema,
  joiLoginSchema,
} = require('../../Schema/joiAuthSchema');

const router = express.Router();

router.post(
  '/singup',
  validation(joiSingupSchema),
  controllerWrapper(ctrl.singup),
);

router.post(
  '/login',
  validation(joiLoginSchema),
  controllerWrapper(ctrl.login),
);

router.get('/logout', authMiddleware, controllerWrapper(ctrl.logout));

module.exports = router;
