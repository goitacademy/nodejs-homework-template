const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const{_id} = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename=`${_id}_${originalname}`;
  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).write(tempUpload);
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, {avatarURL})

  res.json({
    avatarURL
  })
};

module.exports = updateAvatar;