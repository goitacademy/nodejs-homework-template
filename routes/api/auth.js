const express = require('express');

const { joiSchema } = require('../../models/user');
const { validation, controllerWrapper } = require('../../middlewares');
const ctrl = require('../../controllers/auth');

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);

router.post(
  '/register',
  userValidationMiddleware,
  controllerWrapper(ctrl.register),
);

router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login));
// router.get('./logout', controllerWrapper(ctrl.logout));

module.exports = router;
