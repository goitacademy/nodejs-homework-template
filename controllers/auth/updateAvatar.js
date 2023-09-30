const path = require("path");
const fs = require("fs");
// const jimp = require("jimp");

const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  // Rename and remove avatar
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  // Resize avatar
  // const img = await jimp.read(tempUpload);
  // await img.resize(250, 250).writeAsync(tempUpload);

  fs.renameSync(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  // Update avatar URL in DB
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;
