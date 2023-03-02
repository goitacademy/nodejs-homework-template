const Jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');

const { updateAvatar } = require('../../services/users');

const controllerUpdateAvatarUser = async (req, res, next) => {
  const { destination, filename } = req.file;
  const { user } = req;
  const tmpDir = path.join(destination, filename);
  const publicAvatar = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'avatars',
    filename
  );

  try {
    await Jimp.read(tmpDir)
      .then(image => {
        return image.resize(250, 250).write(publicAvatar);
      })
      .catch(err => {
        console.error(err);
      });

    await updateAvatar(user._id, publicAvatar);
    await fs.unlink(tmpDir);
  } catch (error) {
    await fs.unlink(tmpDir);
    return next(error);
  }

  res.status(200).json({ avatarURL: publicAvatar });
};

module.exports = { controllerUpdateAvatarUser };
