const express = require("express");

const { ctrlWrapper, upload, authWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { route } = require("./auth");

const router = express.Router();

router.get("/current", authWrapper, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  authWrapper,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
module.exports = router;
