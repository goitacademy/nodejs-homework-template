const { User } = require('../../models');
const path = require('path');
const fs = require('fs').promises;
const Jimp = require('jimp');
const avatarsDir = path.join(__dirname, '..', '..', 'public', 'avatars');

async function updateAvatar(req, res, next) {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;

  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await Jimp.read(tempUpload).then(image => {
      return image.resize(250, 250).quality(60).write(tempUpload);
    });
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
}

module.exports = updateAvatar;
