const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/user');
const avatarsDir = path.join(__dirname, '../', '../', 'public', 'avatars');

const resizeImage = require('../../utils/resizeImage/resizeImage');

const updateAvatar = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { path: tempUpload, originalname } = req.file;
        const filename = `${_id}_${originalname}`;
        const resultUpload = path.join(avatarsDir, filename);

        const resizeResult = await resizeImage(tempUpload);
        if (!resizeResult) {
            throw new Error('Failed to resize image');
        }

        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join('avatars', filename);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            avatarURL,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateAvatar;
