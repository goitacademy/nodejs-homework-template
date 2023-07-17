const express = require('express');
const { controllerWrapper, validateBody } = require('../../helpers');
const { register, login, logout, current, updateSubscription } = require('../../controllers/users');
const { usersSchema, updateStatusSchema } = require('../../schemas/usersSchema');
const { auth } = require('../../middlewares');

const router = express.Router();

router.post('/register', validateBody(usersSchema), controllerWrapper(register));
router.post('/login', validateBody(usersSchema), controllerWrapper(login));
router.post('/logout', controllerWrapper(auth), controllerWrapper(logout));
router.get('/current', controllerWrapper(auth), controllerWrapper(current));
router.patch(
	'/',
	controllerWrapper(auth),
	validateBody(updateStatusSchema),
	controllerWrapper(updateSubscription)
);

module.exports = router;
