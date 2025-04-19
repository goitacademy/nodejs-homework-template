const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const User = require("../models/user");
const multer = require("multer");

const avatarsDir = path.join(__dirname, "../../public/avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempPath, originalname } = req.file;
    const { _id: userId } = req.user;
    const newFileName = `${userId}_${originalname}`;
    const resultPath = path.join(avatarsDir, newFileName);

    const image = await Jimp.read(tempPath);
    await image.resize(250, 250).writeAsync(resultPath);

    await fs.promises.unlink(tempPath);

    const avatarURL = `/avatars/${newFileName}`;
    await User.findByIdAndUpdate(userId, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ message: "Failed to update avatar" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.verificationToken = null;
    user.verify = true;
    await user.save();
    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updateAvatar, verifyUser };
