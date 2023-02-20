const express = require("express");
const { ctrlWrapper, checkJwt, validation } = require("../../middlewares");
const { joiUserSchemas } = require("../../models");
const { users: ctrl } = require("../../controller");

const router = express.Router();

router.patch(
    "/",
    checkJwt,
    validation(joiUserSchemas.joiSubscriptionSchema),
    ctrlWrapper(ctrl.updateSubscription)
);
router.get("/current", checkJwt, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
