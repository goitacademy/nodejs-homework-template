const path = require('path');
const СreateError = require('http-errors');
const fs = require('fs/promises');
const { User } = require('../../models/user');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const patchAvatar = async (req, res, next) => {
    const { _id } = req.user;
    const { path: tempUpload, filename } = req.file;
    try {
        if (!req.file) {
            throw new СreateError(400, 'No file uploaded or invalid file type')
        }
        
        const [extention] = filename.split(".").reverse();
        const newFileName = `${_id}.${extention}`;
        const resultUpload = path.join(avatarsDir, newFileName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join('avatars', newFileName);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({ avatarURL });

    } catch (error) {
        next(error);
    }
};

module.exports = patchAvatar;