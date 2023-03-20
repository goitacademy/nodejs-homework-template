const express = require("express");

const { updateSubscriptionSchemaJoi } = require("../../models");

const ctrl = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchemaJoi),
  ctrl.updateSubscription
);

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
