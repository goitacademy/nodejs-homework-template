const express = require("express");
const multer = require("multer");
const path = require("path");
const { asyncWrapper } = require("../helpers/apiHelpers");

const filesRouter = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("../../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const { updateAvatarController } = require("../controllers/filesController");

const uploadMiddleware = multer({ storage });

filesRouter.post(
  "/upload",
  uploadMiddleware.single("avatar"),
  asyncWrapper(updateAvatarController)
);

module.exports = filesRouter;
