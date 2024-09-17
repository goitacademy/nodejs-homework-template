const { ctrlWrapper } = require("../../helpers");
const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models");
const Jimp = require("jimp");

const UpdateAvatarURL = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;

  const publicDer = path.join(__dirname, "../", "../", "public", "avatars");

  (await Jimp.read(tempDir)).resize(250, 250).write(tempDir);

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(publicDer, filename);

  await fs.rename(tempDir, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = { UpdateAvatarURL: ctrlWrapper(UpdateAvatarURL) };