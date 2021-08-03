const path = require('path');
const fs = require('fs').promises;
const tempDir = path.join(process.cwd(), 'tmp');
const storeImage = path.join(process.cwd(), 'public/avatars');
const Jimp = require('jimp');
const moment = require('moment');
const authService = require('../../services/auth');

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'file not found',
    });
  }

  const { path: tempName, originalname } = req.file;
  const { _id } = req.user;

  const useDirectory = path.join(tempDir, _id.toString());
  const publicDirectory = path.join(storeImage, _id.toString());
  const uniqueName = moment().format('YYYY-MM-DD-HH-mm-ss');
  try {
    // Write to tmp
    await fs.mkdir(useDirectory);
    const fileName = path.join(useDirectory, originalname);
    fs.rename(tempName, fileName);

    // Write to public
    await fs.mkdir(publicDirectory);
    const newFileURL = path.join(
      publicDirectory,
      'avatar' + uniqueName + '.jpg',
    );

    Jimp.read(`${useDirectory}/${originalname}`, (err, image) => {
      if (err) throw err;
      image.resize(250, 250).write(newFileURL);
    });

    const updUser = {
      avatarURL: newFileURL,
    };

    await authService.updateById(_id, { avatarURL: updUser.avatarURL });

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: updUser,
      },
    });
  } catch (error) {
    fs.unlink(tempName);
  }
};

module.exports = updateAvatar;
