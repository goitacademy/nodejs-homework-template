const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const { User } = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUploadDir, filename } = req.file;
  const fileExt = '.' + filename.split('.')[1];
  const newFileName = `${_id}_avatar${fileExt}`;
  const finalUploadDir = path.join(avatarsDir, newFileName);

  await fs.rename(tempUploadDir, finalUploadDir);

  console.log(finalUploadDir);

  Jimp.read(finalUploadDir, (err, img) => {
    if (err) throw err;
    img.resize(250, 250).write(finalUploadDir);
  });

  const avatarURL = path.join('avatars', newFileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
