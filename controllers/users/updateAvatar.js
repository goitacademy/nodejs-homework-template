const catchAsync = require("../../utils/catchAsync");
const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  //   console.log("================================");
  //   console.log(tempUpload);
  const newFileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, newFileName);
  // jimp resize
  const image = await Jimp.read(tempUpload);
  await image.cover(250, 250).write(tempUpload);
  // move to avatars folder
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", newFileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
});

module.exports = updateAvatar;
