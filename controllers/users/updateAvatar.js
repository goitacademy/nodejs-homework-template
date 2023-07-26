const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const imgAvatar = await Jimp.read(tempUpload);
  await imgAvatar.autocrop().cover(250,250, Jimp.HORIZONTAL_ALIGN_CENTER ||Jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(tempUpload);

  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;

