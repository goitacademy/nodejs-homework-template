const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");

const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  const image = await Jimp.read(resultUpload);
  image.resize(256, 256).write(resultUpload);

  const avatarURL = path.join("../../public", "avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  return res.status(200).json({ avatarURL });
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
