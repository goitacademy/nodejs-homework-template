const Users = require('../model/users')
const { httpCode } = require('../model/helpers/constants')
const fs = require('fs').promises
const path = require('path')
const Jimp = require('jimp')
require('dotenv').config()
const createFolderIfNotExists = require('../model/helpers/createDir')


const currentUser = async (req, res, next) => {
    const id = req.user.id
    const user = await Users.findById(id)
    if (!user) {
        return res.status(httpCode.NOTFOUND).json({
            message: "Not authorized"
        })
    }
    return res.status(httpCode.OK).json({
        email: user.email,
        subscription: user.subscription,
        avatar: user.avatar
    })
}

const avatars = async (req, res, next) => {
    try {
        const id = req.user.id
        const avatarUrl = await saveAvatarToStatic(req)

        await Users.updateAvatar(id, avatarUrl)
        return res.json({
            status: 'success',
            code: httpCode.OK,
            data: {
                avatarUrl
            }
        })
    } catch (e) {
        next(e)
    }
}

const saveAvatarToStatic = async (req) => {
    const id = req.user.id
    const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS
    const pathFile = req.file.path
    const newNameAvatar = `${Date.now()}-${req.file.originalname}`
    const img = await Jimp.read(pathFile)
    await img
        .autocrop()
        .cover(
            250,
            250,
            Jimp.HORIZONTAL_ALIGN | Jimp.VERTICAL_ALIGN_MIDDLE)
        .writeAsync(pathFile)
    await createFolderIfNotExists(path.join(AVATARS_OF_USERS, id))
    await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar))

    try {
        await fs.unlink(path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatar))
    } catch (e) {
        console.log(e)
    }
    return path.normalize(path.join(id, newNameAvatar))
}
module.exports = {
    currentUser,
    avatars
}