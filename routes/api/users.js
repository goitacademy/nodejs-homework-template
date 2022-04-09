const express = require('express');

const { joiUserSchema, joiSubscriptionSchema } = require('../../models');
const { validateBody, ctrlWrapper, auth } = require('../../middlewares');

const usersControllers = require('../../controllers/users');

const router = express.Router();

router.post('/signup', validateBody(joiUserSchema), ctrlWrapper(usersControllers.signup));
router.post('/login', validateBody(joiUserSchema), ctrlWrapper(usersControllers.login));
router.get('/logout', auth, ctrlWrapper(usersControllers.logout));
router.get('/current', auth, ctrlWrapper(usersControllers.getCurrent));
router.patch('/:userId/subscription', validateBody(joiSubscriptionSchema), ctrlWrapper(usersControllers.patchSubscription));

module.exports = router;