const jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');

const IMG_DIR = path.resolve('./public/avatars');

const { updateAvatarURL } = require('../services/userService');

const avatarUploadController = async (req, res) => {
  const { _id: userId } = req.user;
  if (req.file) {
    const { file } = req;
    const avatarURL = file.path;
    const img = await jimp.read(avatarURL);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(avatarURL);

    const publicAvatarURL = path.join(IMG_DIR, file.filename);

    await fs.copyFile(avatarURL, publicAvatarURL);

    console.log(publicAvatarURL);
    const newUser = await updateAvatarURL(userId, publicAvatarURL);

    res.status(200).json({ newUser, status: 'avatar updated' });
  }
};

module.exports = {
  avatarUploadController,
};
