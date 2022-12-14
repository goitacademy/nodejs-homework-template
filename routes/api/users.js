const express = require("express");

const { ctrlWrapper, auth, validation } = require("../../middlewares");

const router = express.Router();

const { users: ctrl } = require("../../controllers");

const { joiSubscriptionSchema } = require("../../models/user");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
