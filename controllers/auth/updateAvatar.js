const path = require("path");
const fs = require("fs/promises");
const {
  userModel: { User },
} = require("../../models");
const { jimpAvatar } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await jimpAvatar(tempUpload);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200);
  res.json({ avatarURL });
};

module.exports = updateAvatar;
