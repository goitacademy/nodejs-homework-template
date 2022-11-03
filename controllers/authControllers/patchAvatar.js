const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models/auth');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const patchAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { originalname, path: tempDir } = req.file;

  const extention = originalname.split('.').pop();
  const newName = `${_id}.${extention}`;
  const resultUpload = path.join(avatarDir, newName);
  await fs.rename(tempDir, resultUpload);
  const avatarUrl = path.join(avatarDir, newName);

  await User.findByIdAndUpdate(_id, { avatarUrl });
  res.status(200).json({ avatarUrl: avatarUrl });
};

module.exports = patchAvatar;
