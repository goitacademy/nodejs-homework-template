const Jimp = require("jimp");
const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imgName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, imgName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imgName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    Jimp.read(resultUpload, (err, img) => {
      if (err) throw err;
      img.resize(250, 250).write(resultUpload);
    });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
