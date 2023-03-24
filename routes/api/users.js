const express = require("express");

const ctrl = require("../../controllers/users");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { updateSubscriptionSchemaJoi } = require("../../models/user");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchemaJoi),
  ctrl.updateSubscription
);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
