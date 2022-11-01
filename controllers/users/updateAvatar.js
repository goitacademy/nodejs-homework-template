const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
    const {_id: id} = req.user;
    const { path: tempUpload, originalname } = req.file;
    const imageName = `${id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarDir, imageName);
        await fs.rename(tempUpload, resultUpload);
        const file = await Jimp.read(resultUpload);
        await file.resize(250, 250).write(resultUpload);
        const avatarURL = path.join('public', 'avatarts', imageName);
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        res.json({ avatarURL });
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};

module.exports = updateAvatar;