const express = require('express');

const router = express.Router();

const { validateBody } = require('../../dec');

const { authSchema, subscriptionSchema } = require('../../schemas');

const userAuth = require('../../controllers/auth');

const { authenticate } = require('../../middlewares');

router.post('/register', validateBody(authSchema), userAuth.userRegister);

router.post('/login', validateBody(authSchema), userAuth.userLogin);

router.get('/current', authenticate, userAuth.getCurrent);

router.post('/logout', authenticate, userAuth.logout);

router.patch('/', authenticate, validateBody(subscriptionSchema), userAuth.updateSubscription);

module.exports = router;
