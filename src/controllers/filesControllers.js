const path = require("path");
const { User } = require("../db/authModel");
const fs = require("fs/promises");
const Jimp = require("jimp");

const uploadController = async (req, res) => {
  const avatarsPath = path.join(__dirname, "../", "public", "avatars");
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsPath, fileName);
  await fs.rename(tempUpload, resultUpload);
  const resizeImage = await Jimp.read(resultUpload);
  resizeImage.resize(250, 250).write(resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.updateOne({ _id }, { avatar: avatarURL });
  res.json({
    status: "succses upload",
    // avatarURL
  });
};

module.exports = { uploadController };
