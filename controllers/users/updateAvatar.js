const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");

const { User } = require("../../models");

const avatarsDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsDir, filename);
  const avatarURL = path.join("avatars", filename);
  fs.rename(oldPath, newPath);
  await jimp
    .read(newPath)
    .then((img) => img.resize(250, 250).write(newPath))
    .catch((err) => console.error(err));
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
