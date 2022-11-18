const {User} = require('../../models/user')
const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const publicPath = path.join(__dirname, '../../', 'public', 'avatars')

const patchAvatar = async(req,res) => {
    const {_id} = req.user;
    const {path: oldTempPath, originalname} = req.file
    console.log(req.file);
    const extension = originalname.split(".").pop();
    const avatarUrl = `${_id}.${extension}`
    const avatarPathForFS = path.join(publicPath, avatarUrl)
    await fs.rename(oldTempPath, avatarPathForFS)

    const resizeAvatar = await Jimp.read(avatarPathForFS);
    resizeAvatar.resize(200, 250).write(avatarPathForFS);

    const avatarUrlName = path.join('avatars', avatarUrl)
    await User.findByIdAndUpdate(_id, {avatarUrl: avatarUrlName})
    res.json({avatarUrlName}).status(200)
}

module.exports = patchAvatar;