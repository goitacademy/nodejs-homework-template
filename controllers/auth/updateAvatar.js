const path = require("path");
const fs = require("fs/promises");
const Users = require("../../models/userShema");
const Jimp = require("jimp");
const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");
const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const fileName = `${_id}_${originalname}`;
  const image = await Jimp.read(tempUpload);
  const resultUpload = path.join(avatarDir, fileName);
  await fs.unlink(tempUpload);
  image.resize(250, 250).write(resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await Users.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
