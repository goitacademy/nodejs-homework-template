const express = require("express");

const { updateSubscriptionSchemaJoi } = require("../../models");

const ctrl = require("../../controllers/users");

const { validatebody, authenticate } = require("../../middlewares");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validatebody(updateSubscriptionSchemaJoi),
  ctrl.updateSubscription
);

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
