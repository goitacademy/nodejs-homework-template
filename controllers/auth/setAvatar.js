const {basedir} = global
const path = require('path')
const fs = require('fs/promises')
const User = require(`${basedir}/models/user`)
const transformAvatar = require(`${basedir}/helpers/transformAvatars`)

const setAvatar = async (req, res) => {
    try {
        const {_id} = req.user
        const file = req.file
        await transformAvatar(file.path)
        const avatarsDir = path.join(basedir, "public", "avatars")
        const [extension] = file.originalname.split(".").reverse()
        const newName = `${_id}.${extension}`
        const uploadPath = path.join(avatarsDir, newName)
        await fs.rename(file.path, uploadPath)
        const avatarURL = path.join("avatars", newName)
        await User.findByIdAndUpdate(_id, {avatarURL})
        res.json({
            avatarURL
        })
    } catch (error) {
        await fs.unlink(req.file.path)
        throw error
    }
}

module.exports = setAvatar