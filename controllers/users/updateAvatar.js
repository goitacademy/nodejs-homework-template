const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalName } = req.file;
  try {
    const resultUpload = path.join(avatarsDir, originalName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('public', 'avatars', originalName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    req.json({ avatarURL: avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};
module.exports = updateAvatar;
