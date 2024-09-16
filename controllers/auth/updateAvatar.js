const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const tmpDir = path.join(__dirname, "../../", "temp");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const tmpFilename = `${_id}_${originalname}`;
  const tmpFilePath = path.join(tmpDir, tmpFilename);

  await fs.rename(tempUpload, tmpFilePath);

  const image = await Jimp.read(tmpFilePath);
  await image.resize(250, 250).quality(80).writeAsync(tmpFilePath);

  const avatarName = `${_id}_${Date.now()}.jpg`;
  const avatarPath = path.join(avatarsDir, avatarName);

  await fs.rename(tmpFilePath, avatarPath);

  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
