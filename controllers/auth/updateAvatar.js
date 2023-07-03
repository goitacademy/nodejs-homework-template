const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");
const { User } = require("../../models");
const { wrapper, HttpError } = require("../../helpers");
console.log(555);

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Missing 'avatar' field");
  }

  const img = await jimp.read(req.file.path);

  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(req.file.path);

  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;

  const fileName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", fileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = wrapper(updateAvatar);
