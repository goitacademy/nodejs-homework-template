const { User } = require('../../models/users');
const fs = require('fs/promises');
const path = require('path');
const { uploadDestination, avatarPath } = require('../../path');
const Jimp = require('jimp');

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error();
      err.status = 400;
      err.message = 'File is required';
      throw err;
    }

    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;

    const fileName = `${_id}__${originalname}`;

    await fs.rename(tempUpload, path.join(uploadDestination, fileName));

    const image = await Jimp.read(path.join(uploadDestination, fileName));

    image.resize(250, 250);
    image.quality(60);
    image.write(path.join(uploadDestination, fileName));

    const avatarURL = path.join(avatarPath, fileName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ status: 'success', code: 200, avatarURL });
  } catch (e) {
    next(e);
  }
};

module.exports = updateAvatar;
