const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  console.log(tempUpload);
  const { _id: id } = req.user;
  const imageName = `${id}${path.extname(originalname)}`;
  try {
    const resultUpload = path.join(avatarsDir, imageName);
    const resizeAvatarURL = await Jimp.read(tempUpload);
    await fs.rename(tempUpload, resultUpload);
    resizeAvatarURL.resize(250, 250).write(resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = updateAvatar;
