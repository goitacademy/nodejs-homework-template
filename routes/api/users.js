const express = require("express");

const {
  authenticate,
  controllerWrapper,
  upload,
} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", authenticate, controllerWrapper(ctrl.getCurrent));
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  controllerWrapper(ctrl.updateAvatar)
);

module.exports = router;
