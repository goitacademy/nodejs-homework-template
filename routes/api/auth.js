const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const { validateBody, isEmptyBody, authenticate, upload, isEmptyFieldAvatar, isValidEmail } = require('../../middlewares');
const schemas = require('../../schemas/user');

router.post('/register', isEmptyBody, validateBody(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', isValidEmail, validateBody(schemas.verifyEmailSchema), ctrl.resendVerifyEmail)

router.post('/login', isEmptyBody, validateBody(schemas.loginSchema), ctrl.login);

router.patch('/', authenticate, validateBody(schemas.subscriptionSchema), ctrl.updateSubscription);

router.patch('/avatars', authenticate, upload.single("avatar"), isEmptyFieldAvatar, ctrl.updateAvatar)

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;
 