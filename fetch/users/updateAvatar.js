const User = require("../../models/users");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const photoUser = await Jimp.read(tempUpload);
    await photoUser.cover(250, 250).writeAsync(tempUpload);

    const newImageName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, newImageName);

    await fs.rename(tempUpload, resultUpload);

    const avatarUrl = path.join( "avatars", newImageName);

    await User.findByIdAndUpdate(_id, { avatarUrl });

    res.json({
      avatarUrl,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;