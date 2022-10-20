const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const img = await Jimp.read(tempUpload);
    await img.resize(250, 250).writeAsync(tempUpload);
    
    try {
        const resultUpload = path.join(avatarsDir, originalname);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join('public', 'avatars', originalname);
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        res.json({ avatarURL });

    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
}

module.exports = updateAvatar;