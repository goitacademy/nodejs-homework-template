const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const avatarName = `${id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, avatarName);
  try {
    await fs.rename(tempUpload, resultUpload);
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
  const file = await Jimp.read(resultUpload);
  await file.resize(250, 250).write(resultUpload);

  const avatarURL = path.join("avatars", avatarName);

  await User.findByIdAndUpdate(id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
