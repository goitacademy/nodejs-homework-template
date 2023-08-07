const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const jimp = require('jimp')

const { userSchema } = require('../schemas/users.schema')
const { getUserById } = require('../service/users.service')

require('dotenv').config()

const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

const tempPath = path.join(__dirname, '../', '/temp')

const JWT_KEY = process.env.JWT_KEY

const usersValidate = (req, res, next) => {
    const { error } = userSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    next()
}

const isAuthorized = async (req, res, next) => {
    const { authorization = '' } = req.headers

    const [bearer, token] = authorization.split(' ')

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    try {
        const { id } = jwt.verify(token, JWT_KEY)

        const user = await getUserById(id)

        if (!user || user.token !== token) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        req.user = user

        next()
    } catch (e) {
        return res.status(401).json({ message: 'Token expired' })
    }
}

const uploadAvatarConfig = multer.diskStorage({
    destination: tempPath,
})

const avatarUpload = multer({
    limits: {
        fileSize: 5242880,
    },
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('file is not allowed'))
        }

        cb(null, true)
    },
    fileName: (req, file, cb) => {
        const { _id } = req.user

        cb(null, _id)
    },
    storage: uploadAvatarConfig,
})

const avatarResize = async (req, res, next) => {
    const { path: imagePath } = req.file
    const image = await jimp.read(imagePath)
    const resizedImage = await image.resize(250, 250)

    await resizedImage.write(imagePath)

    next()
}

module.exports = {
    usersValidate,
    isAuthorized,
    avatarUpload,
    avatarResize,
}
