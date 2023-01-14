const express = require('express');

const {user: ctrl} = require('../../controllers');
const {subscriptionJoinSchema} = require('../../models/user');
const {validation, ctrlWrapper, auth, upload} = require('../../middlewares');
const router = new express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
    '/subscription',
    auth,
    validation(subscriptionJoinSchema),
    ctrlWrapper(ctrl.updateSubscription),
);


router.patch(
    '/avatars',
    auth,
    upload.single('avatar'),
    ctrlWrapper(ctrl.updateAvatar),
);

module.exports = router;
