const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");
console.log(avatarsDir);

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const img = await Jimp.read(resultUpload);
  await img.resize(250, 250).write(resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};
module.exports = updateAvatar;
