const express = require('express');
const ctrl = require('../../controllers/users');
const { validateBody, authenticate, upload, resizeAvatar } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/', authenticate, validateBody(schemas.patchSubscriptionSchema), ctrl.patchSubscription);

router.patch('/avatars', authenticate, upload.single('avatar'), resizeAvatar, ctrl.updateAvatar);

module.exports = router;
