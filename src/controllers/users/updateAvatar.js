const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
// console.log(avatarsDir);
// const {v4} = require("uuid");


const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const {_id: id} = req.body;
  const imageName = `${id}_${originalname}`
  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
const avatarURL = path.join("public", "avatars", imageName); 
// public/avatars/my-avatar.png
await User.findByIdAndUpdate(req.user._id, {avatarURL});
res.json({avatarURL});
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
    // next(error);
  }
};

module.exports = updateAvatar;
