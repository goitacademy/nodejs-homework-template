const express = require('express');
const {
    authenticate,
    validation,
    ctrlWrapper,
    upload,
} = require("../../middlewares");

const { joiSubscriptionSchema } = require("../../models");
const { users: usersCtrl } = require("../../controllers");

const router = express.Router();

router.get("/current", authenticate, ctrlWrapper(usersCtrl.getCurrent));

RuleTester.patch(
    "/",
    authenticate,
    validation(joiSubscriptionSchema),
    ctrlWrapper(usersCtrl.updateSubscription),
);

router.patch(
    "/avatars",
    authenticate,
    upload.single("avatar"),
    ctrlWrapper(usersCtrl.updateAvatar),
);

module.exports = router;