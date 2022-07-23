const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsPath = path.join(__dirname, "../../", "public", "avatars");

async function changeAvatar(req, res) {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const responseUpload = path.join(avatarsPath, imageName);
    await fs.rename(tempUpload, responseUpload);
    await Jimp.read(responseUpload).resize(250, 250);
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.status(200);
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
}

module.exports = changeAvatar;
