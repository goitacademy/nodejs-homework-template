/* eslint-disable quotes */
/* eslint-disable semi */
const { User } = require("../../models");
const path = require("path");
const fs = require("fs").promises;

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const newAvatarName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, newAvatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", newAvatarName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
