/* eslint-disable no-undef */
const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../model");
const { authenticate, upload } = require("../../middlewares");
const router = express.Router();

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.get("/logout", authenticate, async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).send();
});

router.get("/current", authenticate, async (req, res) => {
  const { name, email } = req.user;
  res.json({
    user: { name, email },
  });
});

router.patch("/avatars", authenticate, upload.single("avatar"), async (req, res) => {
    const { path: tempUpload, filename } = req.file;
    [extension] = filename.split(".").reverse();
    const newFileName = `${req.user._id}.${extension}`;
    const fileUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, fileUpload);
    const avatarURL = path.join("avatars", newFileName);
    try {
      const avatarResize = await Jimp.read(fileUpload);
      avatarResize.resize(250, 250);
      avatarResize.write(fileUpload);
    } catch (error) {
      console.log(error);
      throw new Error("Error size avatar");
    }
    await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });
    res.json({ avatarURL });
  }
);

module.exports = router;