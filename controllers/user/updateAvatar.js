const { User } = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;

  const extention = originalname.split('.').pop();

  const avatarName = `${_id}.${extention}`;

  try {
    const resultUpload = path.join(avatarsDir, avatarName);

    await fs.rename(tempUpload, resultUpload);

    const image = await jimp.read(resultUpload);
    await image.resize(250, 250);
    await image.writeAsync(resultUpload);

    const avatarURL = path.join('avatars', avatarName);

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
