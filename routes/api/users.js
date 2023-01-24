const express = require("express");

const { ctrlWrapper, upload, authWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", authWrapper, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  authWrapper,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
module.exports = router;
