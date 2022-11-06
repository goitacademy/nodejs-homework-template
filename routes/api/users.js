const express = require("express");

const { users: ctrl } = require("../../controllers");
const { authh, ctrlWrapper, validation } = require("../../middlewares");
const { joiSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.get("./current", authh, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  authh,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
