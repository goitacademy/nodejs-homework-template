const express = require('express');
const { controllerWrapper, validateBody } = require('../../helpers');
const {
	register,
	login,
	logout,
	current,
	updateSubscription,
	avatars,
} = require('../../controllers/users');
const { usersSchema, updateStatusSchema } = require('../../schemas/usersSchema');
const { auth, upload } = require('../../middlewares');

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
router.patch(
	'/avatars',
	controllerWrapper(auth),
	upload.single('image'),
	controllerWrapper(avatars)
);

module.exports = router;
