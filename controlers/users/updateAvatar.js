// const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models");
const service = require("../../service");
const Jimp = require("jimp");
const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, fileName);

  Jimp.read(tempUpload)
    .then((img) => img.resize(250, 250).write(resultUpload))
    .catch(() => next(service.CreateError(422)));

  const avatarURL = path.join("avatars", fileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};
module.exports = service.ctrlWrap(updateAvatar);
