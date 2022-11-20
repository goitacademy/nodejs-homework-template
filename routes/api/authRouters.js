const express = require("express");
const {
  registerController,
  loginController,
  getCurrent,
  logout,
  avatarUpdate,
} = require("../../controller/authController");
const { auth } = require("../../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");
const uploadDir = path.join(process.cwd(), "tmp");

const { nanoid } = require("nanoid");
const router = express.Router();

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function (req, file, cb) {
    cb(null, nanoid() + file.originalname);
  },
});
const upload = multer({
  storage,
});

router.post("/signup", registerController);
router.post("/login", loginController);
router.get("/current", auth, getCurrent);
router.get("/logout", auth, logout);
router.patch("/avatars", auth, upload.single("avatar"), avatarUpdate);
module.exports = router;
