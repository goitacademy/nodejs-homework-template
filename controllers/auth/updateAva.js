const path = require('path');
const fs = require('fs').promises;
const { User } = require('../../models/user');
const { resize } = require('../../helpers');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAva = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  await resize(tempUpload);
  const filename = `${req.user._id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(req.user._id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = updateAva;
