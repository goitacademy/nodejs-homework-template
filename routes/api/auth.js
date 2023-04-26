const express = require('express');

const validation = require('../../middlewares/validation');
const upload = require('../../middlewares/upload');
const {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
} = require('../../schemas/users');
const { users: ctrl } = require('../../controllers');
const authenticate = require('../../middlewares/authenticate');

const router = express.Router();

router.post(
    '/register',
    validation.registerValid(registerSchema),
    ctrl.register
);

router.post('/login', validation.loginValid(loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.getCurrent);

router.patch(
    '/',
    authenticate,
    validation.updateSubscriptionValid(updateSubscriptionSchema),
    ctrl.updateSubscription
);

router.patch(
    '/avatars',
    authenticate,
    upload.single('avatar'),
    ctrl.updateAvatar
);

module.exports = router;
