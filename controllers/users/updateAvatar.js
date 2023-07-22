const fs = require("fs/promises");
const path = require("path");

const { ctrlWrapper, normalizeAvatar } = require("../../helpers");
const { User } = require("../../models/user");

const avatarStoragePath = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempAvatar, filename } = req.file;
  await normalizeAvatar(tempAvatar, 250);
  const { _id } = req.user;
  const avatarURL = path.join("avatars", filename);
  const avatarPath = path.join(avatarStoragePath, filename);
  await fs.rename(tempAvatar, avatarPath);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = ctrlWrapper(updateAvatar);
