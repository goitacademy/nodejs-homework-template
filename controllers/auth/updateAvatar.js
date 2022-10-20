const { User } = require('../../models/user');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const newDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const uniqueAvatarName = `${id}_${originalname}`;
    const resultUpload = path.join(newDir, uniqueAvatarName);

    try {
        await fs.rename(tempUpload, resultUpload);

        const avatarFile = await Jimp.read(resultUpload);
        await avatarFile.resize(250, 250).write(resultUpload);
        const avatarURL = path.join('public', 'avatars', uniqueAvatarName);

        await User.findByIdAndUpdate(req.user._id, { avatarURL });

        res.json({ avatarURL });
    } catch (error) {
        fs.unlink(tempUpload);
    }
};

module.exports = updateAvatar;
