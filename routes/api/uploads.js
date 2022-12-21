const express = require("express");

const router = express.Router();
const { authenticate, upload } = require("../../middlewares");
const uploadAvatar = require("../../controllers/uploadFiles");
const { controllerWrapper } = require("../../helpers");

router.post(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  // upload.any(),
  // validateBody(),
  controllerWrapper(uploadAvatar.uploadAvatar)
);

module.exports = router;
