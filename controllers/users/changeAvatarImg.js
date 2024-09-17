const fs = require('fs/promises');
const path  = require('path');
const User = require('../../models/users/users');
var Jimp = require("jimp");




const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const changeAvatarImg = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(500).json({ message: 'Your file is not valid or added' })
        }
        const { _id } = req.user
        const { path: tempDir, originalname } = req.file;
        const newImgName = `${_id}__${originalname}`
        const resultUpload = path.join(avatarDir, newImgName);
        await Jimp.read(tempDir)
        .then((image) => {
            return image
                    .resize(250, 250, Jimp.RESIZE_BEZIER)
                    .write(resultUpload);
  })
  .catch((err) => {
    console.error(err);
  });
        await fs.rm(tempDir);
        const avatarURL = path.join("avatars", newImgName);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.status(200).json({ avatarURL: avatarURL });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ooops... Something brakes in Avatar' });
    }
}

module.exports = { changeAvatarImg };