const express = require("express");
const multer = require("multer");
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("/public/avatars"));
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split(".");
    cb(null, `${filename}.${extension}`);
  },
});

const { uploadController } = require("../../controller/filesController");
const { asyncWrapper } = require("../../helpers/apiHelper");
const uploadMiddleware = multer({ storage });

router.post(
  "/upload",
  uploadMiddleware.single("avatar"),
  asyncWrapper(uploadController)
);

router.post();

module.exports = router;
