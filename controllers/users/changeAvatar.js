const { uploadCloud } = require('../../helpers')
const fs = require('fs/promises')
const cloudinary = require('cloudinary').v2
const { users: service } = require('../../services')


const changeAvatar = async (req, res, next) => {
    const id = req.user._id
    const pathFile = req.file.path
    const oldAvatar = await service.getAvatar(id)
    const { public_id: idCloudAvatar, secure_url: avatarURL } = await uploadCloud(pathFile)
    const url = await service.updateAvatar(id, idCloudAvatar, avatarURL)

    try {
        if (!url || !req.user.token) {
            res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Not authorized',
            })
            return
        }

        cloudinary.uploader.destroy(oldAvatar.idCloudAvatar, function (err, result) {
            console.log(err, result)
        })

        await fs.unlink(pathFile)

        res.json({
            status: 'success',
            code: 200,
            data: {
                result: {
                    avatarURL: avatrURL
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = changeAvatar
