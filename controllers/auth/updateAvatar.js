const path = require("path")
const fs = require("fs/promises")
const Jimp = require("jimp")
const {User} = require("../../models/user")
const avatarsDir = path.join(__dirname, "../../", "public", "avatars")


const updateAvatar = async (req, res) => {
    const {path: tmpDir, originalname} = req.file
    const {_id} = req.user
    const [extention] = originalname.split(".").reverse()
    const newName = `${_id}.${extention}`
    const resultDir = path.join(avatarsDir, newName)
    await fs.rename(tmpDir, resultDir)
    const avatarURL = path.join("avatars", newName)
    const nameForJimp = path.join("public/avatars", newName)
    Jimp.read(nameForJimp, (err, newName) => {
        if (err) throw err
        newName
            .resize(250, 250)
    })
    await User.findByIdAndUpdate(_id, {avatarURL})
    res.json({
        avatarURL
    })
}

module.exports = updateAvatar