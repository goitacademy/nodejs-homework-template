const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { User } = require('../../models/user');

const avatarsDir = path.join(__dirname, '../', '../', 'public', 'avatars');

const desiredWidth = 250;
const desiredHeight = 250;

const updateAvatar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { path: tempUpload, originalname } = req.file;
        const filename = `${_id}_${originalname}`;
        const resultUpload = path.join(avatarsDir, filename);
        await fs.rename(tempUpload, resultUpload);
        const image = await Jimp.read(resultUpload);
        await image.resize(desiredWidth, desiredHeight).writeAsync(resultUpload);
        const avatarURL = path.join('avatars', filename);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({ avatarURL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

module.exports = updateAvatar;
