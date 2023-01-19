const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { error } = require('console');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await Jimp.read(tempUpload)
      .then(avatar => {
        return avatar.resize(250, 250).quality(60).write(resultUpload);
      })
      .catch(error => {
        throw error;
      });
    // await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('public', 'avatars', imageName);
    const updateUserAvatar = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      {
        new: true,
      },
    );
    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
