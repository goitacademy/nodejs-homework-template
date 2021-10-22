const express = require("express");

const {
    controllerWrapper,
    validation,
    authenticate,
    upload,
} = require("../../middlewares");
const { joiSubscriptionSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.patch(
    "/",
    authenticate,
    validation(joiSubscriptionSchema),
    controllerWrapper(ctrl.updateSubscription)
);

router.patch(
    "/avatars",
    authenticate,
    upload.single("avatar"),
    controllerWrapper(ctrl.updateAvatar)
);

module.exports = router;