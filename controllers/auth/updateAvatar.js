const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const tmpDir = path.join(__dirname, "../../", "tmp");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const image = await Jimp.read(tempUpload);
  image.resize(250, 250);

  const uniqueFinename = `${_id}_${originalname}`;
  const resultUploadTmp = path.join(tmpDir, originalname);
  const resultUpload = path.join(avatarsDir, uniqueFinename);

  await image.writeAsync(resultUploadTmp);

  await fs.rename(resultUploadTmp, resultUpload);

  const avatarURL = path.join("avatars", uniqueFinename);

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = updateAvatar;
