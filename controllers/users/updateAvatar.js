const {HttpError, ctrlWrapper} = require('../../helpers');
const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/user');
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const updateAvatar = async(req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const filename = `${_id}_${originalname.resize(250, 250, Jimp.RESIZE_BEZIER)}`
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, {avatarURL})

    if(!avatarURL) {
        throw HttpError(401, 'Not authorized');
    }

    res.status(200).join({avatarURL})
}

module.exports = {
    updateAvatar: ctrlWrapper(updateAvatar),
}