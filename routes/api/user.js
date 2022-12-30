const express = require("express");

const { user: ctrl } = require("../../controllers");
const { subscriptionJoinSchema } = require("../../models/userModel");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/subscription",
  auth,
  validation(subscriptionJoinSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;