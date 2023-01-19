const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => { 
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const FileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, FileName);
  
  await Jimp.read(tempUpload)
  .then(avatar => {
    return avatar.resize(250, 250).write(tempUpload);
    // return avatar.resize(250, 250).write(resultUpload);
  })
  .catch(err => {
    console.error(err);
  });

  await fs.rename(tempUpload, resultUpload);
  // await fs.unlink(tempUpload);
  const avatarURL = path.join('avatars', FileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  })
}

module.exports = updateAvatar;