const express = require("express");

const router = express.Router();
const { validateBody, authenticate, upload } = require("../../middlewares");
const uploadFiles = require("../../controllers/uploadFiles");

const { updateContactSchema } = require("../../schemas");
const { controllerWrapper } = require("../../helpers");

router.post(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  validateBody(updateContactSchema),
  controllerWrapper(uploadFiles.uploadAvatar)
);

module.exports = router;
