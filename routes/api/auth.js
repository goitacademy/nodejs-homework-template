const express = require('express');

const ctrlUser = require('../../controllers/users');
const {
  validateBody,
  authenticate,
  validateSubscription,
} = require('../../middlewares');
const schemas = require('../../schemas/users');

const router = express.Router();

router.post('/register', validateBody(schemas.userSchema), ctrlUser.register);

router.post('/login', validateBody(schemas.userSchema), ctrlUser.login);

router.post('/logout', authenticate, ctrlUser.logout);

router.get('/current', authenticate, ctrlUser.getCurrent);

router.patch(
  '/',
  authenticate,
  validateSubscription(schemas.updateSubscriptionSchema),
  ctrlUser.updateSubscription
);

module.exports = router;
