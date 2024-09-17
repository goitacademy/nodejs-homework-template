const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "..", "..", "public", "avatars");
const updAvatar = async (req, res) => {
  const { _id } = req.user;

  if (!req.file) throw HttpError(400, "missing field avatar");

  const { path: tempUpload, originalname } = req.file;
  await Jimp.read(tempUpload).then((img) =>
    img.resize(250, 250).write(`${tempUpload}`)
  );

  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  if (!avatarURL) throw HttpError(404, "Not found");

  res.json({ avatarURL });
};

module.exports = updAvatar;