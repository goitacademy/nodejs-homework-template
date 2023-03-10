const express = require("express");
const { user: ctrl } = require("../../controllers");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.get("/current", ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  ctrlWrapper(auth),
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
