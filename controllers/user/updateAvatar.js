const fs = require('fs').promises
const path = require('path')
const User = require('../../models/users')
const Jimp = require('jimp')
const { HttpError, handleReqError } = require('../../helpers')

const updateAvatar = async (req, res, next) => {
    const { _id } = req.user
    const { path: tmpUpload, originalname } = req.file
    const extention = originalname.split('.').pop()
    const filename = `${_id}.${extention}`
    const uploadDir = path.join(__dirname, "../../", 'public', 'avatars')
    const uploadPath = path.join(uploadDir, filename)

    const image = await Jimp.read(tmpUpload)
    await image.resize(250, 250).writeAsync(tmpUpload)

    try {
        await fs.rename(tmpUpload, uploadPath)
        const avatarURL = `avatar/${filename}`
        // const avatarURL = path.join('avatar', filename)
        // const user = await User.updateAvatar(_id, { avatarURL })
        const user = await User.updateAvatar(_id, avatarURL)


        if (!user) {
            return next(HttpError(401, "Not authorized"))
        }

        res.json({
            avatarURL: user.avatarURL
        })
    } catch (err) {
        next(err)
    }
}

module.exports = handleReqError(updateAvatar)