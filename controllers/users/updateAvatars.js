const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const { Unauthorized } = require('http-errors');

const avatarsDir = path.join(__dirname, '../../publik/avatars');

const updateAvatars = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const imageName = `${_id}_${originalname}`;
  const resultUploaded = path.join(avatarsDir, imageName);

  try {
    await fs.rename(tempUpload, resultUploaded);
    const avatarURL = path.join('../../publik/avatars', imageName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(201).json({
      status: 'success',
      code: 200,
      message: 'avatar uploaded',
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw new Unauthorized(`Not authorized`);
  }
};

module.exports = updateAvatars;
