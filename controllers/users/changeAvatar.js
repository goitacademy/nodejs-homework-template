// const jimp = require('jimp')
// const path = require('path')
// const fs = require('fs/promises')
const { users: service } = require('../../services')
// const uploadDir = path.join(process.cwd(), 'public', 'avatars')

const changeAvatar = async (req, res, next) => {
    const id = req.user._id
    const pathFile = req.file.path
    const url = await service.updateAvatar(id, pathFile)

    try {
        // const img = await jimp.read(pathFile)
        // await img.autocrop().cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(pathFile)
        // await fs.rename(pathFile, fileName)
        res.json({
            status: 'success',
            code: 200,
            data: {
                result: {
                    avatarURL: url
                }
            }
        })
    } catch (error) {
        // await fs.unlink(tempPath)
        next(error)
    }
}

module.exports = changeAvatar
