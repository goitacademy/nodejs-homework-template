const path = require('path');
const fs = require('fs/promises');

const { User } = require('../../schema');
const { resizeImage } = require('../../helpers');

const avatarsDir = path.join(__dirname, '../', '../', 'public', 'avatars');

async function updateAvatar(req, res, next) {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    await resizeImage(tempUpload);

    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
}

module.exports = { updateAvatar };
