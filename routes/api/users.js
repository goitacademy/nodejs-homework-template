const express = require("express");

const { users: ctrl } = require("../../controllers");
const { auth, upload, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
