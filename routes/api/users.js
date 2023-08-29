const path = require("node:path");
const express = require("express");
const UserController = require("../../controllers/user");
const { authenticate,resize } = require("../../middlewares");
const multer = require("multer");


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "tmp"));
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname,extname)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const name = `${basename}-${uniqueSuffix}${extname}`
    cb(null,name);
  },
});

const upload = multer({ storage });

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),resize,
  UserController.uploadAvatar
);

module.exports = router;
