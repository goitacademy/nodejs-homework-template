const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const path = require("path");
const { authenticate } = require("../../middleware");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");
const { files: ctrl } = require("../../controllers");
// const upload = multer({ dest: "./tmp" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./tmp");
  },
  filename: (req, file, cb) => {
    const [_, extension] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extension}`);
  },
});
const uploadMiddleware = multer({ storage });
router.patch(
  "/avatars",
  authenticate,
  uploadMiddleware.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
module.exports = router;
