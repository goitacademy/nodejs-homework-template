const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");
const { validation, authentic } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

router.get("/current", authentic, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  authentic,
  validation(schemas.subscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
