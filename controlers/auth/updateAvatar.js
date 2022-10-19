const fs = require('fs/promises');
const { User } = require('../../models/user.js');
const path = require('path');
const Jimp = require('jimp');
/** rout to file */
const avatarsDir = path.join(__dirname, '..', '..', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  try {
    /** get path to tmp(temporary storage) and file name */
    const { path: tmpUpload, originalname } = req.file;

    const { _id } = req.user;
    /** get extention from filename */
    const extention = originalname.split('.').pop();
    /** create new custom name for file */
    const fileName = `${_id}.${extention}`;
    /** it is the location where we keep our file  */
    const resultUpload = path.join(avatarsDir, fileName);
    // open a file called "lenna.png"

    const newImg = await Jimp.read(tmpUpload);
    newImg.resize(50, 50);
    newImg.write(tmpUpload);

    /** move our file to public  */
    await fs.rename(tmpUpload, resultUpload);
    /** relative path */
    const avatarUrl = path.join('avatars', fileName);

    /**  */
    await User.findByIdAndUpdate(_id, { avatarUrl });
    res.json({
      avatarUrl,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
