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
  const { path: tempUpload, originalname } = req.file;

  await resizeAvatar(tempUpload);

  const { _id } = req.user;

  const [originalName, extension] = originalname.split('.');
  const newAvatarName = `${_id}.${extension}`;

  const resultUpload = path.join(avatarDir, newAvatarName);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join('avatars', newAvatarName);
  await updateAvatar(_id, avatarURL, originalName);

  res.json({
    avatarURL,
  });
};
