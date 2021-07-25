const fs = require('fs/promises')
const jimp = require('jimp')
const path = require('path')

const avatarsDir = path.join(process.cwd(), './public/avatars')

const addAvatar = async (req, res, next) => {
    const { path: tempName, originalname } = req.file
    const img = await jimp.read(req.file.path)
    console.log(img)
    img.autocrop().cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(req.file.path)
    const fileName = path.join(avatarsDir, originalname)
    try {
        await fs.rename(tempName, fileName)
        res.json({
            status: 'success',
            code: 200,
            data: {
                avatar: fileName
            }
        })
    } catch (error) {
        await fs.unlink(tempName)
        next(error)
    }
}
module.exports = addAvatar
