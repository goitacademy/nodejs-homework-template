const { User } = require('../../models/user');
const fs = require('fs/promises');
const path = require('path');
const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');
const Jimp = require('jimp');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  await Jimp.read(tempUpload)
    .then(avatar => {
      return avatar
        .resize(250, 250) // resize
        .write(tempUpload);
    }) // save
    .catch(err => {
      console.log(err);
    });
  const extention = originalname.split('.').pop();
  const filename = `${_id}.${extention}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
