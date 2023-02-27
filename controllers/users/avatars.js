const { modelUser } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const Jimp = require("jimp");

const avatars = async (req, res, next) => {
  const { path: tmpUp, originalname } = req.file;
  const { _id } = req.user;
  const nameAvatar = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, nameAvatar);

    await fs.rename(tmpUp, resultUpload);
    const resizeImage = await Jimp.read(resultUpload);
    resizeImage.resize(250, 250).write(resultUpload);
    const avatarURL = path.join("avatars", nameAvatar);

    await modelUser.User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUp);
    next(error);
  }
};
module.exports = avatars;