const path = require('path');
const fs = require('fs').promises;
const { User } = require('../../models/user');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAva = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  console.log(req.file);
  const resultUpload = path.join(avatarsDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', originalname);
  await User.findByIdAndUpdate(req.user._id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = updateAva;
