const express = require("express");

const ctrl = require("../../controlers/user");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.patch(

  "/subscription",

  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
