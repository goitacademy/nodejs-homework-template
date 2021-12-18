const { User } = require("../../model/users");
const path = require("path");
const fs = require("fs/promises");
var Jimp = require("jimp");
const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const avatarUpload = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, {
      avatarURL,
    });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = avatarUpload;
