const express = require('express');
const { controllerWrapper, validateBody } = require('../../helpers');
const {
	register,
	login,
	logout,
	current,
	updateSubscription,
	avatars,
	verify,
	resetVerify,
} = require('../../controllers/users');
const { usersSchema, updateStatusSchema, resetVerifySchema } = require('../../schemas/usersSchema');
const { auth, upload, updateImg } = require('../../middlewares');

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
	controllerWrapper(updateImg),
	controllerWrapper(avatars)
);
router.get('/verify/:verificationToken', controllerWrapper(verify));
router.post('/verify', validateBody(resetVerifySchema), controllerWrapper(resetVerify));

module.exports = router;
