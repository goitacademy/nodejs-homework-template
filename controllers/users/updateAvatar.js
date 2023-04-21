const Jimp = require('jimp');
const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const { NotFound } = require('http-errors');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const transformAvatar = async path => {
  const avatar = Jimp.read(path);
  await (
    await avatar
  )
    .autocrop()
    .contain(
      250,
      250,
      Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
    )
    .writeAsync(path);
};

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new NotFound(400, 'Bad Request. Please add your avatar image.');
    }
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;
    const [extention] = filename.split('.').reverse();
    const newFileName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', newFileName);
    console.log(avatarURL);
    await User.findByIdAndUpdate(_id, { avatarURL });
    transformAvatar(avatarURL);
    res.json({
      avatarURL,
    });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.tempUpload);
    }
    next(error);
  }
};

module.exports = updateAvatar;
