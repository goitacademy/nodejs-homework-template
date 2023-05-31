const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/user');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');
const avatarSize = 250;
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await Jimp.read(tempUpload)
    .then(image => {
      return image.resize(avatarSize, avatarSize).write(resultUpload);
    })
    .catch(err => {
      console.error('Error resizing image:', err);
      throw err;
    });

  await fs.unlink(tempUpload); // Delete the temporary upload file
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;

//   await fs.rename(tempUpload, resultUpload);
