const express = require('express');
const { auth, ctrlWrapper, validation, upload } = require("../../middlewares");
const { users: ctrl } = require('../../controllers');
const { joiSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.get('/current',
    auth(["ADMIN", "MODERATOR", "CUSTOMER", "EDITOR", "GUEST"]), 
    ctrlWrapper(ctrl.getCurrent)
);

router.get('/verify/:verificationToken', 
    ctrlWrapper(ctrl.verifyEmail)
);

router.post('/verify',
    ctrlWrapper(ctrl.verifyEmailCreate)
);

router.patch('/',
    auth(["ADMIN", "MODERATOR", "CUSTOMER", "EDITOR", "GUEST"]),
    validation(joiSubscriptionSchema),
    ctrlWrapper(ctrl.updateSubscription)
);

router.patch('/avatars',
    auth(["CUSTOMER"]),
    upload.single("avatar"),
    ctrl.updateAvatar
);

module.exports = router;
