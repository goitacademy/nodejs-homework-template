const User = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const avatarDir = path.resolve('public', 'avatars');

const updateAvatarUser = async (req, res, next) => {
  try {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarDir, filename);

    const image = await Jimp.read(oldPath);
    await image.resize(250, 250).writeAsync(oldPath);

    await fs.rename(oldPath, newPath);
    console.log(`oldPath`, oldPath);
    console.log(`newPath`, newPath);
    const avatarURL = path.join('public', 'avatars', filename);

    const user = await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });

    res.json({ avatarURL: user.avatarURL });
  } catch (error) {
    console.log(`updateAvatarError`);
    next(error);
  }
};

module.exports = updateAvatarUser;
