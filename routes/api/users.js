const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");
const { validation, authentic, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const {ctrlWrapper} = require("../../helpers");

router.get("/current", authentic, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  authentic,
  validation(schemas.subscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  authentic,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
