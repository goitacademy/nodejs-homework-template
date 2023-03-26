const express = require("express");

const { auth } = require("../../middlewares");
const { validation, ctrlWrapper } = require("../../helpers");
const { subscriptionSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/subscription",
  auth,
  validation(subscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
