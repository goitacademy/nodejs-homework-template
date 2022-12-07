const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { setAvatarULR } = require("../../models/files");

const FILE_DIR = path.resolve("./tmp");

router.use("/", express.static("./public/avatars"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILE_DIR);
  },
  filename: function (req, file, cb) {
    const [, extension] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage });

router.patch(
  "/users/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  setAvatarULR
);

module.exports = router;
