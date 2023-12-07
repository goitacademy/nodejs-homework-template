const express = require("express");

const AvatarController = require("../../controllers/avatar");
const upload = require("../../middleware/upload");
const router = express.Router();

router.patch(
  "/avatars",
  upload.single("avatar"),
  AvatarController.uploadAvatar
);

module.exports = router;
