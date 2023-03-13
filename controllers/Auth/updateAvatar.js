const User = require("../../db/users");
const path = require("path");
const fs = require('fs/promises')

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res) => {
    const { _id } = req.user
    const { path: tempUpload, originalname } = req.file
    const extention = originalname.split('.').pop()
    const filename = `${_id}.${extention}`
    const resultUpload = path.join(avatarDir, filename)
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join('avatars', filename)
    await User.findByIdAndUpdate(_id, { avatarURL })
    
    res.json({avatarURL})
}

module.exports = updateAvatar