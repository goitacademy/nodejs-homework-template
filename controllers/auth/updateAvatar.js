const fs = require('fs/promises');
const path = require('path');

const { optimizationImg } = require('../../helpers/index');

const user = require('../../models/user');

const avatarsPath = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsPath, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join('avatars', filename);

  optimizationImg(avatarURL);

  await user.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
