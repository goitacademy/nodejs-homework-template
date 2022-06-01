const express = require("express");

const { auth, upload, validation } = require("../../middlewares");
const { users: controllers } = require("../../controllers");
const { joiSubscriptionShema } = require("../../models/user");

const router = express.Router();

router.get(
  "/current",
  auth,
  validation(joiSubscriptionShema),
  controllers.getCurrentUser
);
router.patch("/subscription", auth, controllers.changeSubscription);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
