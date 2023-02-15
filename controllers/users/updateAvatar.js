const fs = require('fs/promises');
const path = require('path');
const {
  updateAvatar,
  resizeAvatar,
} = require('../../services/users');

const avatarDir = path.join(
  __dirname,
  '..',
  '..',
  'public',
  'avatars'
);

module.exports = async (req, res) => {
  try {
    const { path: tempUploadPath, originalname } = req.file;
    const { _id } = req.user;

    await resizeAvatar(tempUploadPath);

    const [name, extension] = originalname.split('.');
    const newAvatarName = `${_id}.${extension}`;

    const resultUpload = path.join(
      avatarDir,
      newAvatarName
    );
    await fs.rename(tempUploadPath, resultUpload);

    const avatarURL = path.join('avatars', newAvatarName);
    await updateAvatar(_id, avatarURL, name);

    res.json({
      avatarURL,
    });
  } catch (err) {
    res
      .status(500)
      .json(
        'An error occurred while updating your avatar.'
      );
  }
};
