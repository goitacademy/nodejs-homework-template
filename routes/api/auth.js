const express = require('express');
const router = express.Router();
const {
    validateBody,
    authenticate,
    multerUpload,
} = require('../../middleware');
const { controllerWrapper } = require('../../helpers');
const { schemas } = require('../../models/user');

const controll = require('../../controllers/auth');

router.post(
    '/signup',
    validateBody(schemas.registerSchema),
    controllerWrapper(controll.register)
);

router.post(
    '/login',
    validateBody(schemas.loginSchema),
    controllerWrapper(controll.login)
);

router.get('/current', authenticate, controllerWrapper(controll.getCurrent));

router.get('/logout', authenticate, controllerWrapper(controll.logout));

router.patch(
    '/',
    authenticate,
    validateBody(schemas.updateSubscriptionSchema),
    controllerWrapper(controll.updateSubscription)
);

// Обновление аватара

router.patch(
    '/avatars',
    multerUpload.single('avatar'),

    authenticate,
    validateBody(schemas.updateAvatar),
    controllerWrapper(controll.updateAvatar)
);
module.exports = router;
