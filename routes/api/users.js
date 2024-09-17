const express = require("express");

const { upload } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");

const { auth, resize } = require("../../middlewares");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");

router.patch(
  "/avatars",
  auth,
  upload.single("avatarURL"),
  resize,
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
