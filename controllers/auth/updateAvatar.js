const User = require("../../models/auth");
const fs = require("fs/promises");
const path = require("path");

const dirAvatars = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempDir, originalname } = req.file;
  const { _id } = req.user;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(dirAvatars, filename);

  await fs.rename(tempDir, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
