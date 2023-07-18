const path = require('path');
const fs = require('fs/promises');
var Jimp = require('jimp');

const { User } = require('../../models/user');

const { ctrlWrapper } = require('../../helpers');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', fileName);
  Jimp.read(`${resultUpload}`)
    .then(file => {
      return file.resize(250, 250).write(`${resultUpload}`);
    })
    .catch(err => {
      console.error(err);
    });

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(201).json({
    avatarURL,
  });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
