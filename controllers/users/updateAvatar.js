const catchAsync = require("../../utils/catchAsync");
const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const newFileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, newFileName);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", newFileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
});

module.exports = updateAvatar;
