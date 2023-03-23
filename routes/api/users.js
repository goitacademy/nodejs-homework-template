const express = require("express");

const ctrl = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middlewares");

const { updateSubscriptionSchemaJoi } = require("../../models/user");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchemaJoi),
  ctrl.updateSubscription
);

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
