const path = require('path');
const fs = require('fs').promises;

const { User } = require("../../models/user/index");

const avatarDir = path.join(__dirname, '../', '../', 'public', 'avatars')

const updateAvatar = async (req, res, next) => {
    const { _id } = req.user;

    const { path: tempUpload, originalname} = req.file;

    const filename = `${_id}_${originalname}`
    const resultUpload = path.join(avatarDir, filename);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ResponseBody: {avatarURL}})
}

module.exports = updateAvatar;