const express = require("express");
const { users: ctrl } = require("../../controllers");
const { subscriptionUserSchema } = require("../../models");

const { userAuth, ctrlWrapper, validation } = require("../../middlewares");

const router = express.Router();

router.get("/current", userAuth, ctrlWrapper(ctrl.getCurrentUser));

router.patch(
  "/",
  userAuth,
  validation(subscriptionUserSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
module.exports = router;
