const User = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
// const Jimp = require('jimp');

const avatarDir = path.resolve('public', 'avatars');

const updateAvatarUser = async (req, res, next) => {
  try {
    const { path: oldPath, filename } = req.file;

    const newPath = path.join(avatarDir, filename);
    await fs.rename(oldPath, newPath);
    console.log(`oldPath`, oldPath);
    console.log(`newPath`, newPath);

    // const newSizeAvatar = Jimp.read()
    // .then((newPath) => {
    //   return newPath
    //     .resize(256, 256) // resize
    //     .write(newPath); // save
    // })
    // .catch((err) => {
    //   console.error(err);
    // });

    const avatarURL = path.join('public', 'avatars', filename);

   

    console.log(`newSize-------------------------------`, newSizeAvatar);

    console.log(`avatarURL`, avatarURL);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    console.log(`updateAvatarError`);
    next(error);
  }
};

module.exports = updateAvatarUser;
