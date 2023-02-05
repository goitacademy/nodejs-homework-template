const express = require('express');
const { asyncMiddlewareWrapper } = require('@root/helpers');
const { validateBody } = require('@root/middlewares');
const { userJoiSchema } = require('@root/models');
// const validateID = require('@root/middlewares/validateID');
const { authActions } = require('@root/controllers');

const router = express.Router();

router.post(
  '/signup',
  validateBody(userJoiSchema, 'Ошибка от Joi или другой библиотеки валидации'),
  asyncMiddlewareWrapper(authActions.signup)
);
router.post(
  '/login',
  validateBody(userJoiSchema, 'Ошибка от Joi или другой библиотеки валидации'),
  asyncMiddlewareWrapper(authActions.login)
);

module.exports = router;
