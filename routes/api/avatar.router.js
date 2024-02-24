const express = require("express");
const avatar = express.Router();
const multer = require("multer");
const jimp = require("jimp");
const User = require("../../model/user.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/avatars");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

avatar.patch("/", upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No avatar file uploaded" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const processedAvatar = await jimp.read(req.file.path);
    await processedAvatar.resize(250, 250).write(req.file.path);

    const avatarFileName = `${user.id}-${Date.now()}.jpg`;
    await processedAvatar.write(`public/avatars/${avatarFileName}`);

    user.avatarURL = `/avatars/${avatarFileName}`;
    await user.save();

    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    console.error("Error updating user avatar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = avatar;
