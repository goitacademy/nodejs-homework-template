const { catchAsync } = require('../../utils');
// const createError = require('http-errors');
const path = require('path');
const fs = require('fs').promises;
const Jimp = require('jimp');

const { User } = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = catchAsync(async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);
    const avatarURL = path.join('public', 'avatars', imageName);

    await fs.rename(tempUpload, resultUpload);

    const image = await Jimp.read(`${avatarURL}`);
    await image.resize(250, 250);
    await image.writeAsync(`${avatarsDir}\\${imageName}`);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.status(200).json({
      status: 'updated',
      code: 200,
      data: {
        user: {
          avatarURL,
        },
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
});

module.exports = updateAvatar;
