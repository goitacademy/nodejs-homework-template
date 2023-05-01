const express = require('express');

const validation = require('../../middlewares/validation');
const upload = require('../../middlewares/upload');
const {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
    emailSchema,
} = require('../../schemas/users');
const { users: ctrl } = require('../../controllers');
const authenticate = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/register', validation.validate(registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);
router.post(
    '/verify',
    validation.validate(emailSchema),
    ctrl.resendVerifyEmail
);

router.post('/login', validation.validate(loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.getCurrent);

router.patch(
    '/',
    authenticate,
    validation.validate(updateSubscriptionSchema),
    ctrl.updateSubscription
);

router.patch(
    '/avatars',
    authenticate,
    upload.single('avatar'),
    ctrl.updateAvatar
);

module.exports = router;
