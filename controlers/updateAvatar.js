const { ctrlWrapper } = require("../helpers");
const path = require("path");
const fs = require("fs");
const { User } = require("../models");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", originalname);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json = {
    avatarURL,
  };
};

module.exports = ctrlWrapper(updateAvatar);
