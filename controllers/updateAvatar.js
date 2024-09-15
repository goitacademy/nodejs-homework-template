const { User } = require("../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { RequestError } = require("../helpers");

const avatarsDir = path.join(__dirname, "..", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const changeSizeAvatar = await Jimp.read(tempUpload);
  if (!changeSizeAvatar) {
    throw RequestError(400);
  }
  changeSizeAvatar.resize(250, 250).write(tempUpload);

  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;