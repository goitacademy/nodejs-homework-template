const fs = require("fs/promises");
const path = require("path");
const avatarDir = path.resolve("public", "avatars");
const Jimp = require("jimp");

const User = require("../../models/user");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempPath, filename } = req.file;

  const jimpRead = await Jimp.read(tempPath);
  const jimpResized = await jimpRead.resize(250, 250);
  await jimpResized.write(tempPath);

  const newPath = path.join(avatarDir, filename);

  await fs.rename(tempPath, newPath);
  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = updateAvatar;
