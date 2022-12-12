const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadController } = require("../controllers/filesControllers");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddelwares } = require("../middelewares/authMiddeleares");
const uploadDir = path.join(process.cwd(), "tmp");
const router = new express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split(".");
    cb(null, `${filename}.${extension}`);
  },
  limits: {
    fileSize: 1048576,
  },
});

const uploadMiddelware = multer({ storage });
router.use(authMiddelwares);
router.patch(
  "/avatars",
  uploadMiddelware.single("avatar"),
  asyncWrapper(uploadController)
);

module.exports = router;
