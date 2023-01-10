const express = require('express');

const { validation, controllerWrapper } = require('../../Middlewares');
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

module.exports = router;
