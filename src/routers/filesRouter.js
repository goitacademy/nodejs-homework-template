const express = require("express");
const multer = require("multer");
const path = require("path");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const AVATARS_DIR = path.resolve("./tmp");
const PUBLIC_DIR = path.resolve("./public");

const filesRouter = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATARS_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const { updateAvatarController } = require("../controllers/filesController");

const uploadMiddleware = multer({ storage });

filesRouter.post(
  "/upload",
  [authMiddleware, uploadMiddleware.single("avatar")],
  asyncWrapper(updateAvatarController)
);
filesRouter.use("/", express.static(PUBLIC_DIR));

module.exports = filesRouter;
