const fs = require('fs/promises');
const path = require('path');

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => { 
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const FileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, FileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', FileName);
  await User.findByIdAndUpdate( _id, { avatarURL });

  res.json({
    avatarURL,
  })
}

module.exports = updateAvatar;