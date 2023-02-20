const Jimp = require('jimp');
const path = require('path');

const controllerUpdateAvatarUser = async (req, res) => {
  const { destination, filename } = req.file;
  const tmpDir = path.join(destination, filename);
  const publicAvatar = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'avatars',
    filename
  );

  await Jimp.read(tmpDir)
    .then(image => {
      return image.resize(250, 250).write(publicAvatar);
    })
    .catch(err => {
      console.error(err);
    });

  res.status(200).json({ avatarURL: 'тут будет ссылка на изображение' });
};

module.exports = { controllerUpdateAvatarUser };
