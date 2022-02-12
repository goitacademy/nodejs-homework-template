const path = require('path');
const fs = require('fs/promises');

const { User } = require('../../models');

const AVATAR_PATH = '../../public/avatars';
const avatarsPath = path.join(__dirname, AVATAR_PATH);

const STORAGE_FOLDER = 'avatars';

const avatars = async (req, res, next) => {
    const {_id} = req.user;
    const {path: tempUpload, filename} = req.file;

    const [extention] = filename.split(".").reverse();
    const newFileName = `${_id}.${extention}`
    try {
        const resultUpload = path.join(avatarsPath, newFileName);
        await fs.rename(tempUpload, resultUpload);

        const avatarURL = path.join(STORAGE_FOLDER, newFileName)
        await User.findByIdAndUpdate(_id, {avatarURL});

        res.json({
            avatarURL
        })
    } catch (error) {
        next(error);
    }
};

module.exports = avatars;