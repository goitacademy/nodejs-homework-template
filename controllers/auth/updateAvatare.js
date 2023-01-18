const path = require('path')
const fs = require('fs/promises')

const { User } = require('../../models/user')
const { resize } = require('../../helpers')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatare = async(req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    const fileName = `${_id}_${originalname}`;
    await resize(tempUpload);
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    })

}

module.exports = updateAvatare;