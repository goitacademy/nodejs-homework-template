const express = require("express");

const { auth, upload } = require("../../middlewares");
const { users: controllers } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, controllers.getCurrentUser);
router.patch("/subscription", auth, controllers.changeSubscription);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
