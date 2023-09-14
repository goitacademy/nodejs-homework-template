const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ctrlUpload = require("../controllers/upload.controller");
const auth = require("../middleware/auth");

const uploadDir = path.join(process.cwd(), ".tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  "/users/avatars",
  auth,
  upload.single("avatar"),
  ctrlUpload.uploadAvatar
);

module.exports = router;
