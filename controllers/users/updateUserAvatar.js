const path = require("path");
const fs = require("fs/promises");

const User = require("../../models/users");

const pathUsersAvatars = path.join(
  __dirname,
  "../",
  "../",
  "public",
  "avatars"
);

async function updateUserAvatar(req, res) {
  const { _id } = req.user;
  const { path: pathToTemp, originalName } = req.file;
  const extension = path.extname(originalName);
  const avatarFileName = `${_id}${extension}`;

  const targetAvatarPath = path.join(pathUsersAvatars, avatarFileName);

  await fs.rename(pathToTemp, targetAvatarPath);

  const avatarURL = path.join("avatars", avatarFileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
}

module.exports = updateUserAvatar;
