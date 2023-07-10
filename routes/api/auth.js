const express = require('express');

const ctrl = require('../../controllers/auth');

const { validateBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

// singin
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
// signup
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
// current user
router.get('/current', authenticate, ctrl.getCurrent);
// logout
router.post('/logout', authenticate, ctrl.logout);
// update subscription
// router.patch(
//   '/',
//   authenticate,
//   validateBody(schemas.updateSubscribtionSchema),
//   ctrl.updateSubscription
// );

module.exports = router;
