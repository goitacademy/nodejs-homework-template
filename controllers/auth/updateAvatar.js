const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatar");
const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;
    const avatarName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, avatarName);
    await fs.rename(tmpUpload, resultUpload);

    const image = await Jimp.read(resultUpload);
    await image.resize(250, 250).write(resultUpload);

    const avatarURL = path.join("avatar", avatarName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
