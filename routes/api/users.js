const express = require("express");

const { authenticate, upload } = require("../../middlewares");

const ctrl = require("../../controllers/users");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
