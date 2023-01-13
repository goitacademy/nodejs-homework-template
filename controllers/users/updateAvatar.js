const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const resizeAvatar = async (path) => {
  const avatar = await Jimp.read(path);
  avatar
    .resize(250, 250) // resize
    .quality(80); // set JPEG quality;
  await avatar.writeAsync(path);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, filename } = req.file;
  const newFileName = `${_id}${filename}`;
  const resultUpload = path.join(avatarsDir, newFileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("public", "avatars", newFileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  resizeAvatar(avatarURL);
  res.json({ avatarURL });
};

module.exports = updateAvatar;
