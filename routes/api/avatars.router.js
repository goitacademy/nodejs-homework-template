const express = require("express");
const avatarsRouter = express.Router();

const uploadAvatarMiddleware = require("../../middlewares/uploadAvatarMiddleware");
const { auth } = require("../../middlewares/authMiddleware");

const { uploadController } = require("../../controllers/avatars.controller");

const { tryCatchWrapper } = require("../../helpers/wrappers");

avatarsRouter.post(
  "/",
  tryCatchWrapper(auth),
  uploadAvatarMiddleware.single("avatar"),
  tryCatchWrapper(uploadController)
);

module.exports = avatarsRouter;
